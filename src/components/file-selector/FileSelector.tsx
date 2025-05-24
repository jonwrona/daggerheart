import { CharacterSheet } from "@/types/daggerheart/character-sheet";

type FileSelectorProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleLoad: (json: CharacterSheet) => void;
};

export const FileSelector: React.FC<FileSelectorProps> = ({
  inputRef,
  handleLoad,
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        handleLoad(json);
      } catch (err) {
        alert("Invalid character sheet save file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <input
      ref={inputRef}
      type="file"
      accept="application/json"
      style={{ display: "none" }}
      onChange={onChange}
    />
  );
};
