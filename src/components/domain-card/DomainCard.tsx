import styles from "./DomainCard.module.scss";

import {
  Card,
  CardHeader,
  CardSection,
  type CardProps,
} from "@/components/card/Card";
import { Icon } from "../icon/Icon";
import type { DomainCardDB } from "@/db";
import { capitalize } from "@/utils/capitalize";
import { Modal, useModalControl } from "@/components/modal";
import { shortCode } from "@/utils/shortCode";
import { FeatureMarkdown } from "@/components/markdown/FeatureMarkdown";
import { useContext, useReducer } from "react";
import { DatabaseContext } from "../database-context/DatabaseContext";
import { UUID } from "crypto";

interface DomainCardProps extends Partial<CardProps> {
  card: DomainCardDB;
  onEdit?: (saved: DomainCardDB) => void;
  onDelete?: (deleted: UUID) => void;
}

const editReducer = (state: DomainCardDB, action: any): DomainCardDB => {
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

  const handleSave = async (e: React.MouseEvent<HTMLInputElement>) => {
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
        onDelete?.(card.uuid);
        close();
      }
    }
  };

  const onClose = () => dispatch({ type: "SET_CARD", payload: card });

  return (
    <Modal id={id} onClose={onClose}>
      <form className={styles.domainCardEditForm}>
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
          <textarea
            name="feature"
            value={state.feature}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Save" onClick={handleSave} />
        <button
          type="button"
          onClick={() => {
            // Close the modal without saving
            console.log("Closing modal without saving");
          }}
        >
          Cancel
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </Modal>
  );
};

export const DomainCard = ({
  card,
  onEdit,
  onDelete,
  ...rest
}: DomainCardProps) => {
  const isEditable = !!onEdit;
  const { name, level, domain, type, recallCost, feature } = card;
  const id = "uuid" in card && card.uuid ? card.uuid : shortCode();
  const modalId = `domainCardEdit_${id}`;
  const { open } = useModalControl(modalId);

  return (
    <Card
      className={styles.domainCard}
      {...rest}
      onClick={isEditable ? open : undefined}
    >
      <CardHeader className={styles.domainCardHeader}>
        <span>{name || "<Domain card name>"}</span>
        {isEditable && (
          <Icon name="edit_note" size="1.25rem" className={styles.icon} />
        )}
      </CardHeader>
      <CardSection className="small">
        Level {level} {capitalize(domain)} {capitalize(type)}
        <br />
        Recall cost: {recallCost}
      </CardSection>
      <CardSection className={`small ${styles.domainCardFeature}`}>
        <FeatureMarkdown preview>
          {feature.trim() || "<Feature not defined>"}
        </FeatureMarkdown>
      </CardSection>
      {isEditable && (
        <DomainCardEditModal
          id={modalId}
          card={card}
          onSave={onEdit}
          onDelete={onDelete}
        />
      )}
    </Card>
  );
};
