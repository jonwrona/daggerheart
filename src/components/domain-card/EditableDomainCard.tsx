import styles from "./DomainCard.module.scss";

import { DomainCard, type DomainCardProps } from "./DomainCard";
import { DomainCardDB } from "@/db";
import { Modal, useModalControl } from "@/components/modal";
import { useContext, useReducer } from "react";
import { DatabaseContext } from "../database-context/DatabaseContext";
import { UUID } from "crypto";
import { AutoHeightTextArea } from "../auto-height-textarea/AutoHeightTextarea";
import { shortCode } from "@/utils/shortCode";

interface EditableDomainCardProps extends DomainCardProps {
  onEdit?: (saved: DomainCardDB) => void;
  onDelete?: (deleted: UUID) => void;
}

type EditAction =
  | { type: "HANDLE_INPUT_CHANGE"; field: string; payload: string }
  | { type: "SET_CARD"; payload: DomainCardDB };

const editReducer = (state: DomainCardDB, action: EditAction): DomainCardDB => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return { ...state, [action.field]: action.payload };
    case "SET_CARD":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const DomainCardEditModal = ({
  id,
  card,
  onSave,
  onDelete,
}: {
  id: string;
  card: DomainCardDB;
  onSave?: (card: DomainCardDB) => void;
  onDelete?: (deleted: UUID) => void;
}) => {
  const { close } = useModalControl(id);
  const db = useContext(DatabaseContext);
  const [state, dispatch] = useReducer(editReducer, card);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_INPUT_CHANGE", field: name, payload: value });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const saved = (await db?.putValue(
      "domain_cards",
      state as DomainCardDB
    )) as DomainCardDB | undefined;
    if (saved) {
      onSave?.(saved);
      close();
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (card.uuid) {
      const deleted = await db?.deleteValue("domain_cards", card.uuid);
      console.log(deleted);
      if (deleted) {
        onDelete?.(deleted);
        close();
      }
    }
  };

  const onClose = () => dispatch({ type: "SET_CARD", payload: card });

  return (
    <Modal id={id} onClose={onClose}>
      <form onSubmit={handleSave} className={styles.domainCardEditForm}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Level:
          <input
            type="number"
            name="level"
            min={1}
            max={10}
            value={state.level}
            onChange={handleChange}
          />
        </label>
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            value={state.domain}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={state.type}
          >
            <option value="ability">Ability</option>
            <option value="spell">Spell</option>
            <option value="codex">Codex</option>
          </select>
        </label>
        <label>
          Recall cost:
          <input
            type="number"
            name="recallCost"
            min={0}
            value={state.recallCost}
            onChange={handleChange}
          />
        </label>
        <label>
          Feature:
          <AutoHeightTextArea
            name="feature"
            value={state.feature}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <input type="submit" value="Save" />
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </Modal>
  );
};

export const EditableDomainCard = ({
  card,
  onEdit,
  onDelete,
}: EditableDomainCardProps) => {
  const id = "uuid" in card && card.uuid ? card.uuid : shortCode();
  const modalId = `domainCardEdit_${id}`;
  const { open } = useModalControl(modalId);

  return (
    <>
      <DomainCard card={card} onClick={open} editable />
      <DomainCardEditModal
        id={modalId}
        card={card}
        onSave={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
