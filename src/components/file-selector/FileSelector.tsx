type FileSelectorProps<T> = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleLoad: (json: T) => void;
  acceptedExtensions?: string;
  errorMessage?: string;
};

export const FileSelector = <T,>({
  inputRef,
  handleLoad,
  acceptedExtensions = ".daggerheart",
  errorMessage = "Invalid file format.",
}: FileSelectorProps<T>): React.ReactElement => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        handleLoad(json);
      } catch (err) {
        alert(errorMessage);
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
  return (
    <input
      ref={inputRef}
      type="file"
      accept={acceptedExtensions}
      style={{ display: "none" }}
      onChange={onChange}
    />
  );
};
