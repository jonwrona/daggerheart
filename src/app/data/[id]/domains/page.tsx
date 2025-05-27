"use client";
import { useContext, useEffect, use, useReducer, Fragment } from "react";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import { UUID } from "crypto";
import { Button } from "@/components/button/Button";
import { DomainCard } from "@/components/domain-card/DomainCard";
import { groupBy } from "@/utils/groupBy";
import { StoreValue } from "idb";
import { Database } from "@/db";
import { CardType } from "@/types/daggerheart/daggerheart";
import styles from "./page.module.scss";

interface DomainCardsState {
  domainCards: Record<string, DomainCard[]>;
}

type DomainCard = StoreValue<Database, "domain_cards">;

type DomainCardsAction =
  | { type: "SET_DOMAIN_CARDS"; payload: Record<string, DomainCard[]> }
  | { type: "ADD_DOMAIN_CARD"; payload: { domain: string; card: DomainCard } };

const reducer = (
  state: DomainCardsState,
  action: DomainCardsAction
): DomainCardsState => {
  switch (action.type) {
    case "SET_DOMAIN_CARDS":
      return { ...state, domainCards: action.payload };
    case "ADD_DOMAIN_CARD":
      const { domain, card } = action.payload;
      return {
        ...state,
        domainCards: {
          ...state.domainCards,
          [domain]: [...(state.domainCards[domain] || []), card],
        },
      } as DomainCardsState;
    default:
      return state;
  }
};

const DataPackDomains = ({ params }: { params: Promise<{ id: UUID }> }) => {
  const { id } = use(params);
  const db = useContext(DatabaseContext);
  const [data, dispatch] = useReducer(reducer, { domainCards: {} });

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

  const handleCreate = async () => {
    if (db) {
      try {
        const newDomain = {
          dataPackUUID: id,
          domain: "Test",
          name: "Domain Card",
          level: 1,
          type: "ability" as CardType,
          recallCost: 0,
          feature: "This is the domain card's feature.",
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

  return (
    <>
      <h3>Domains</h3>
      {Object.entries(data.domainCards).map(([domain, cards]) => (
        <Fragment key={domain}>
          <h4>{domain}</h4>
          <div className={styles.domainCardList}>
            {cards.map((card) => (
              <DomainCard
                key={card.uuid}
                card={card}
                onEdit={() => console.log("Click domain card", card.uuid)}
              />
            ))}
          </div>
        </Fragment>
      ))}
      <Button onClick={handleCreate}>Create Domain Card</Button>
    </>
  );
};

export default DataPackDomains;
