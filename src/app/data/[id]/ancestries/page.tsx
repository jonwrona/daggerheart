"use client";
import type { StoreValue } from "idb";
import type { Database } from "@/db";
import type { UUID } from "crypto";
import { Button } from "@/components/button/Button";

import {
  use,
  useContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
} from "react";

import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import { EditableAncestryCard } from "@/components/ancestry-card/EditableAncestryCard";

import styles from "./page.module.scss";

type Ancestry = StoreValue<Database, "ancestries">;

interface AncestriesState {
  ancestries: Ancestry[];
}

type SetAncestriesAction = {
  type: "SET_ANCESTRIES";
  payload: Ancestry[];
};
type AddAncestryAction = {
  type: "ADD_ANCESTRY";
  payload: { ancestry: Ancestry };
};
type EditAncestryAction = {
  type: "EDIT_ANCESTRY";
  payload: { ancestry: Ancestry };
};
type DeleteAncestryAction = {
  type: "DELETE_ANCESTRY";
  payload: { id: UUID };
};

type AncestriesAction =
  | SetAncestriesAction
  | AddAncestryAction
  | EditAncestryAction
  | DeleteAncestryAction;

const editAncestryAction = (
  state: AncestriesState,
  action: EditAncestryAction
): AncestriesState => {
  const updatedAncestry = action.payload.ancestry;
  let newAncestries = [...state.ancestries];
  newAncestries = newAncestries.filter((a) => a.uuid !== updatedAncestry.uuid);
  newAncestries.push(updatedAncestry);
  return { ...state, ancestries: newAncestries };
};

const deleteAncestryAction = (
  state: AncestriesState,
  action: DeleteAncestryAction
): AncestriesState => {
  const deletedId = action.payload.id;
  let newAncestries = [...state.ancestries];
  newAncestries = newAncestries.filter((a) => a.uuid !== deletedId);
  return { ...state, ancestries: newAncestries };
};

const reducer = (
  state: AncestriesState,
  action: AncestriesAction
): AncestriesState => {
  switch (action.type) {
    case "SET_ANCESTRIES":
      return { ...state, ancestries: action.payload };
    case "ADD_ANCESTRY":
      return {
        ...state,
        ancestries: [...state.ancestries, action.payload.ancestry],
      };
    case "EDIT_ANCESTRY":
      return editAncestryAction(state, action);
    case "DELETE_ANCESTRY":
      return deleteAncestryAction(state, action);
    default:
      return state;
  }
};

const DataPackAncestries = ({ params }: { params: Promise<{ id: UUID }> }) => {
  const { id } = use(params);
  const [filter, setFilter] = useState("");
  const [data, dispatch] = useReducer(reducer, { ancestries: [] });
  const db = useContext(DatabaseContext);

  useEffect(() => {
    (async () => {
      if (id && db) {
        try {
          const ancestries = await db.getAllValueByIndex(
            "ancestries",
            "byDataPackUUID",
            id
          );
          dispatch({ type: "SET_ANCESTRIES", payload: ancestries });
        } catch (error) {
          console.error("Error fetching ancestries:", error);
        }
      }
    })();
  }, [id, db]);

  const ancestries = useMemo(() => {
    const filtered = data.ancestries.filter((ancestry) =>
      ancestry.name.toLowerCase().includes(filter.toLowerCase())
    );
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [data.ancestries, filter]);

  const handleCreate = async () => {
    if (db) {
      try {
        const newAncestry = {
          dataPackUUID: id,
          name: "",
          primaryFeature: "",
          secondaryFeature: "",
        };
        const created = await db.putValue("ancestries", newAncestry);
        if (created) {
          dispatch({
            type: "ADD_ANCESTRY",
            payload: { ancestry: created },
          });
        }
      } catch (error) {
        console.error("Error creating ancestry:", error);
      }
    }
  };

  const handleEdit = (saved: Ancestry) => {
    dispatch({
      type: "EDIT_ANCESTRY",
      payload: { ancestry: saved },
    });
  };

  const handleDelete = (id: UUID) => {
    dispatch({
      type: "DELETE_ANCESTRY",
      payload: { id },
    });
  };

  return (
    <>
      <ScrollToTop />
      <h3>Ancestries</h3>
      <Button onClick={handleCreate}>Create Ancestry</Button>
      <input
        type="search"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={styles.ancestriesList}>
        {ancestries.map((ancestry) => (
          <EditableAncestryCard
            key={ancestry.uuid}
            ancestry={ancestry}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default DataPackAncestries;
