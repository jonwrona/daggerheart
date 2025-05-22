"use client";
import Markdown from "react-markdown";
import { Icon } from "@/components/icon/Icon";
import { useRef, useState, useLayoutEffect } from "react";
import { DiceRoll } from "../dice-roll/DiceRoll";

import styles from "./MarkdownField.module.scss";

interface MarkdownFieldProps {
  markdown: string;
  setMarkdown?: (markdown: string) => void;
}

export const MarkdownField = ({
  markdown,
  setMarkdown,
}: MarkdownFieldProps) => {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current && editing) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [markdown, editing]);

  const toggleEditing = () => {
    if (editing === false && setMarkdown) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const onEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = event.target.value;
    setMarkdown?.(newMarkdown);
  };

  return (
    <div className={`${styles.markdownField}`}>
      {setMarkdown && (
        <button className={styles.editButton} onClick={toggleEditing}>
          {editing ? (
            <Icon name="check" size={24} />
          ) : (
            <Icon name="edit" size={24} />
          )}
        </button>
      )}
      {editing ? (
        <textarea
          ref={textareaRef}
          className={`${styles.editor}`}
          value={markdown}
          onChange={onEdit}
        />
      ) : (
        <Markdown
          components={{
            a: ({ ...props }) => {
              const { children } = props;
              if (
                children &&
                typeof children === "string" &&
                children.startsWith("roll:")
              ) {
                return <DiceRoll>{children.replace("roll:", "")}</DiceRoll>;
              }
              return <a {...props} />;
            },
          }}
        >
          {markdown}
        </Markdown>
      )}
    </div>
  );
};
