import { ChangeEvent, useEffect, useRef } from "react";

interface AutoHeightTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AutoHeightTextArea: React.FC<AutoHeightTextAreaProps> = ({
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    const span = spanRef.current;
    if (textarea && span) {
      // Copy content to hidden span to measure height
      span.style.width = `${textarea.offsetWidth}px`;
      const content = textarea.value || textarea.placeholder || "";
      // Add a non-breaking space to preserve trailing newlines
      span.textContent = content + "\u00A0";

      // Calculate desired height
      const desiredHeight = span.offsetHeight + 4;

      // Get maxHeight from props.style if it exists
      const maxHeightValue = props.style?.maxHeight;
      let maxHeightPx: number | undefined;

      if (maxHeightValue) {
        if (
          typeof maxHeightValue === "string" &&
          maxHeightValue.endsWith("rem")
        ) {
          // Convert rem to px (assuming 1rem = 16px, but we should get actual computed value)
          const remValue = parseFloat(maxHeightValue);
          const rootFontSize =
            parseFloat(getComputedStyle(document.documentElement).fontSize) ||
            16;
          maxHeightPx = remValue * rootFontSize;
        } else if (
          typeof maxHeightValue === "string" &&
          maxHeightValue.endsWith("px")
        ) {
          maxHeightPx = parseFloat(maxHeightValue);
        } else if (typeof maxHeightValue === "number") {
          maxHeightPx = maxHeightValue;
        }
      }

      // Set height, respecting maxHeight if specified
      if (maxHeightPx && desiredHeight > maxHeightPx) {
        textarea.style.height = `${maxHeightPx}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${desiredHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  }, [props.value, props.placeholder, props.style?.maxHeight]);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange?.(event);

    // Keep cursor in view after content change
    const textarea = event.target;
    requestAnimationFrame(() => {
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const lines = textBeforeCursor.split("\n");
      const currentLine = lines.length - 1;
      const lineHeight =
        parseFloat(getComputedStyle(textarea).lineHeight) || 20;

      // Get padding values to account for them in cursor position
      const computedStyle = getComputedStyle(textarea);
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;

      // Calculate cursor position relative to the content area (including padding)
      const cursorTop = paddingTop + currentLine * lineHeight;

      // Add some padding above and below the cursor for better visibility
      const scrollPadding = lineHeight * 2;
      const visibleTop = textarea.scrollTop;
      const visibleBottom = textarea.scrollTop + textarea.clientHeight;

      // If cursor is below visible area, scroll to show it with padding
      if (cursorTop + lineHeight > visibleBottom - scrollPadding) {
        textarea.scrollTop =
          cursorTop - textarea.clientHeight + scrollPadding + lineHeight;
      }
      // If cursor is above visible area, scroll to show it with padding
      else if (cursorTop < visibleTop + scrollPadding) {
        textarea.scrollTop = Math.max(0, cursorTop - scrollPadding);
      }
    });
  };
  return (
    <>
      <textarea
        {...props}
        onChange={handleChange}
        ref={textareaRef}
        style={{
          minHeight: "1.5em",
          ...props.style,
          resize: "none",
        }}
      />
      <span
        ref={spanRef}
        className={props.className}
        style={{
          padding: 0,
          ...props.style,
          position: "absolute",
          visibility: "hidden",
          width: "auto",
          overflow: "scroll",
          whiteSpace: "pre-wrap",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      ></span>
    </>
  );
};
