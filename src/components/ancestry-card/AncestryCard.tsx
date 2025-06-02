import { type Database } from "@/db";
import { type StoreValue } from "idb";
import { type CardProps, Card, CardHeader, CardSection } from "../card/Card";

import styles from "./AncestryCard.module.scss";
import { FeatureMarkdown } from "../markdown/FeatureMarkdown";
import { Icon } from "../icon/Icon";

type Ancestry = StoreValue<Database, "ancestries">;

export interface AncestryCardProps extends Partial<CardProps> {
  ancestry: Ancestry;
  editable?: boolean;
}

export const AncestryCard = ({
  ancestry,
  editable = false,
  ...rest
}: AncestryCardProps) => {
  const { name, primaryFeature, secondaryFeature } = ancestry;

  return (
    <Card className={styles.ancestryCard} {...rest}>
      <CardHeader className={styles.ancestryCardHeader}>
        <span>{name || "<Ancestry card name>"}</span>
        {editable && (
          <Icon name="edit_note" size="1.25rem" className={styles.icon} />
        )}
      </CardHeader>
      <CardSection>
        <FeatureMarkdown preview={editable}>
          {primaryFeature.trim() || "<Primary feature not defined>"}
        </FeatureMarkdown>
      </CardSection>
      <CardSection>
        <FeatureMarkdown preview={editable}>
          {secondaryFeature.trim() || "<Secondary feature not defined>"}
        </FeatureMarkdown>
      </CardSection>
    </Card>
  );
};
