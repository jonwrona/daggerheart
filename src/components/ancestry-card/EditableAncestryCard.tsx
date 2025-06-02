import { AncestryCardProps, AncestryCard } from "./AncestryCard";
import { AncestryDB } from "@/db";
import { UUID } from "crypto";
import { shortCode } from "@/utils/shortCode";
import { Modal, useModalControl } from "../modal";
import { DatabaseContext } from "../database-context/DatabaseContext";
import { useContext, useReducer } from "react";
import { AutoHeightTextArea } from "../auto-height-textarea/AutoHeightTextarea";

import styles from "./AncestryCard.module.scss";

interface EditableAncestryCardProps extends AncestryCardProps {
  onEdit?: (saved: AncestryDB) => void;
  onDelete?: (deleted: UUID) => void;
}

type EditAction =
  | { type: "HANDLE_INPUT_CHANGE"; field: string; payload: string }
  | { type: "SET_ANCESTRY"; payload: AncestryDB };

const editReducer = (state: AncestryDB, action: EditAction): AncestryDB => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return { ...state, [action.field]: action.payload };
    case "SET_ANCESTRY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AncestryCardEditModal = ({
  id,
  ancestry,
  onSave,
  onDelete,
}: {
  id: string;
  ancestry: AncestryDB;
  onSave?: (ancestry: AncestryDB) => void;
  onDelete?: (deleted: UUID) => void;
}) => {
  const { close } = useModalControl(id);
  const db = useContext(DatabaseContext);
  const [state, dispatch] = useReducer(editReducer, ancestry);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_INPUT_CHANGE", field: name, payload: value });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const saved = (await db?.putValue("ancestries", state as AncestryDB)) as
      | AncestryDB
      | undefined;
    if (saved) {
      onSave?.(saved);
      close();
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ancestry.uuid) {
      const deleted = await db?.deleteValue("ancestries", ancestry.uuid);
      if (deleted) {
        onDelete?.(deleted);
        close();
      }
    }
  };
  const onClose = () => dispatch({ type: "SET_ANCESTRY", payload: ancestry });

  return (
    <Modal id={id} onClose={onClose}>
      <form onSubmit={handleSave} className={styles.ancestryEditForm}>
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
          Primary feature:
          <AutoHeightTextArea
            name="primaryFeature"
            value={state.primaryFeature}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Secondary feature:
          <AutoHeightTextArea
            name="secondaryFeature"
            value={state.secondaryFeature}
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

export const EditableAncestryCard = ({
  ancestry,
  onEdit,
  onDelete,
  ...rest
}: EditableAncestryCardProps) => {
  const id = "uuid" in ancestry && ancestry.uuid ? ancestry.uuid : shortCode();
  const modalId = `ancestryEdit_${id}`;
  const { open } = useModalControl(modalId);

  return (
    <>
      <AncestryCard
        ancestry={ancestry}
        editable={true}
        onClick={open}
        {...rest}
      />
      <AncestryCardEditModal
        id={modalId}
        ancestry={ancestry}
        onSave={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
