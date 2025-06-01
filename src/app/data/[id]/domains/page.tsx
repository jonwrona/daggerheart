"use client";
import {
  useContext,
  useEffect,
  use,
  useReducer,
  useMemo,
  Fragment,
  useState,
} from "react";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import { UUID } from "crypto";
import { Button } from "@/components/button/Button";
import { DomainCard } from "@/components/domain-card/DomainCard";
import { groupBy } from "@/utils/groupBy";
import { StoreValue } from "idb";
import { Database, DomainCardDB } from "@/db";
import { CardType } from "@/types/daggerheart/daggerheart";
import styles from "./page.module.scss";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";

interface DomainCardsState {
  domainCards: Record<string, DomainCardDB[]>;
}

type DomainCard = StoreValue<Database, "domain_cards">;

type SetDomainCardsAction = {
  type: "SET_DOMAIN_CARDS";
  payload: Record<string, DomainCardDB[]>;
};
type AddDomainCardAction = {
  type: "ADD_DOMAIN_CARD";
  payload: { domain: string; card: DomainCardDB };
};
type EditDomainCardAction = {
  type: "EDIT_DOMAIN_CARD";
  payload: { card: DomainCardDB };
};
type DeleteDomainCardAction = {
  type: "DELETE_DOMAIN_CARD";
  payload: { id: UUID };
};

type DomainCardsAction =
  | SetDomainCardsAction
  | AddDomainCardAction
  | EditDomainCardAction
  | DeleteDomainCardAction;

const editDomainCardAction = (
  state: DomainCardsState,
  action: EditDomainCardAction
): DomainCardsState => {
  const updatedCard = action.payload.card;
  const newDomainCards = { ...state.domainCards };
  // remove the old card from all domains, it should only exist in one
  //   but we ensure it is removed from all to avoid duplicates
  for (const [domain] of Object.entries(state.domainCards)) {
    newDomainCards[domain] = newDomainCards[domain].filter(
      (c) => c.uuid !== updatedCard.uuid
    );
    if (newDomainCards[domain].length === 0) {
      delete newDomainCards[domain];
    }
  }
  // Add the updated card to the correct domain
  newDomainCards[updatedCard.domain] = [
    ...(newDomainCards[updatedCard.domain] || []),
    updatedCard,
  ];
  return { ...state, domainCards: newDomainCards };
};

const deleteDomainCardAction = (
  state: DomainCardsState,
  action: DeleteDomainCardAction
): DomainCardsState => {
  const deletedId = action.payload.id;
  const newDomainCards = { ...state.domainCards };
  for (const [domain] of Object.entries(state.domainCards)) {
    newDomainCards[domain] = newDomainCards[domain].filter(
      (c) => c.uuid !== deletedId
    );
    if (newDomainCards[domain].length === 0) {
      delete newDomainCards[domain];
    }
  }
  return { ...state, domainCards: newDomainCards };
};

const reducer = (
  state: DomainCardsState,
  action: DomainCardsAction
): DomainCardsState => {
  switch (action.type) {
    case "SET_DOMAIN_CARDS":
      return { ...state, domainCards: action.payload };
    case "ADD_DOMAIN_CARD":
      return {
        ...state,
        domainCards: {
          ...state.domainCards,
          [action.payload.domain]: [
            ...(state.domainCards[action.payload.domain] || []),
            action.payload.card,
          ],
        },
      } as DomainCardsState;
    case "EDIT_DOMAIN_CARD":
      return editDomainCardAction(state, action);
    case "DELETE_DOMAIN_CARD":
      return deleteDomainCardAction(state, action);
    default:
      return state;
  }
};

const DataPackDomains = ({ params }: { params: Promise<{ id: UUID }> }) => {
  const { id } = use(params);
  const db = useContext(DatabaseContext);
  const [data, dispatch] = useReducer(reducer, { domainCards: {} });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      if (db) {
        try {
          const domainCards = await db.getAllValueByIndex(
            "domain_cards",
            "byDataPackUUID",
            id
          );
          const groupedDomains = groupBy(domainCards, "domain");
          dispatch({ type: "SET_DOMAIN_CARDS", payload: groupedDomains });
        } catch (error) {
          console.error("Error fetching domains:", error);
        }
      }
    })();
  }, [id, db]);

  const domains = useMemo(() => {
    return Object.entries(data.domainCards).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [data.domainCards, filter]);

  const handleCreate = async () => {
    if (db) {
      try {
        const newDomain = {
          dataPackUUID: id,
          domain: "",
          name: "",
          level: 1,
          type: "ability" as CardType,
          recallCost: 0,
          feature: "",
        };
        const newCard = await db.putValue("domain_cards", newDomain);
        if (newCard) {
          dispatch({
            type: "ADD_DOMAIN_CARD",
            payload: { domain: newDomain.domain, card: newCard as DomainCard },
          });
        }
      } catch (error) {
        console.error("Error creating domain card:", error);
      }
    }
  };

  const onCardEdit = (saved: DomainCardDB) => {
    console.log(saved);
    dispatch({
      type: "EDIT_DOMAIN_CARD",
      payload: { card: saved },
    });
  };

  const onCardDelete = async (id: UUID) => {
    dispatch({
      type: "DELETE_DOMAIN_CARD",
      payload: { id },
    });
  };

  return (
    <>
      <ScrollToTop />
      <h3>Domains</h3>
      <ul>
        {domains.map(
          ([domain]) =>
            domain && (
              <li key={domain}>
                <a href={`#${domain}`} className={styles.domainLabel}>
                  {domain}
                </a>
              </li>
            )
        )}
      </ul>
      <Button onClick={handleCreate}>Create Domain Card</Button>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {domains.map(([domain, cards]) => (
        <Fragment key={domain}>
          <h4 id={domain}>{domain || "<Domain not defined>"}</h4>
          <div className={styles.domainCardList}>
            {cards
              .filter((card) =>
                card.name.toLowerCase().includes(filter.toLowerCase())
              )
              .sort((a, b) => {
                if (a.level !== b.level) {
                  return a.level - b.level;
                }
                return a.name.localeCompare(b.name);
              })
              .map((card) => (
                <DomainCard
                  key={card.uuid}
                  card={card}
                  onEdit={onCardEdit}
                  onDelete={onCardDelete}
                />
              ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default DataPackDomains;
