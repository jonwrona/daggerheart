import Markdown from "react-markdown";
import { DiceRoll } from "@/app/sheet/components/dice-roll/DiceRoll";

import styles from "./Markdown.module.scss";

const HeadingToParagraph = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <p>{props.children}</p>;
};

const headings = {
  h1: HeadingToParagraph,
  h2: HeadingToParagraph,
  h3: HeadingToParagraph,
  h4: HeadingToParagraph,
  h5: HeadingToParagraph,
  h6: HeadingToParagraph,
};

export const FeatureMarkdown = ({
  children,
  preview,
}: {
  children: string;
  preview?: boolean;
}) => {
  return (
    <div className={styles.featureMarkdown}>
      <Markdown
        components={{
          ...headings,
          a: ({ ...props }) => {
            const { children } = props;
            if (
              children &&
              typeof children === "string" &&
              children.startsWith("roll:")
            ) {
              return (
                <DiceRoll preview={preview}>
                  {children.replace("roll:", "")}
                </DiceRoll>
              );
            }
            return <a {...props} />;
          },
        }}
        unwrapDisallowed={true}
      >
        {children}
      </Markdown>
    </div>
  );
};
