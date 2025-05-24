import { ChangeEvent, useEffect, useRef } from "react";

interface AutoWidthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (newValue: string) => void;
}

export const AutoWidthInput: React.FC<AutoWidthInputProps> = ({
  setValue,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const span = spanRef.current;
    if (input && span) {
      console.log(input.value);
      span.textContent = input.value || input.placeholder || "";
      input.style.width = `calc(${span.offsetWidth}px + 0.25em)`;
    }
  }, [props.value, props.placeholder]);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <>
      <input
        {...props}
        onChange={onChange}
        ref={inputRef}
        style={{ ...props.style, width: "auto" }}
      />
      <span
        ref={spanRef}
        className={props.className}
        style={{
          ...props.style,
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "scroll",
          whiteSpace: "pre",
          padding: 0,
          margin: 0,
        }}
      ></span>
    </>
  );
};
