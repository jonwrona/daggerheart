import styles from "./DomainCard.module.scss";

import {
  Card,
  CardHeader,
  CardSection,
  type CardProps,
} from "@/components/card/Card";
import { Icon } from "../icon/Icon";
import { DomainCardDB } from "@/db";
import { capitalize } from "@/utils/capitalize";
import { FeatureMarkdown } from "@/components/markdown/FeatureMarkdown";

export interface DomainCardProps extends Partial<CardProps> {
  card: DomainCardDB;
  editable?: boolean;
}

export const DomainCard = ({
  card,
  editable = false,
  ...rest
}: DomainCardProps) => {
  const { name, level, domain, type, recallCost, feature } = card;

  return (
    <Card className={styles.domainCard} {...rest}>
      <CardHeader className={styles.domainCardHeader}>
        <span>{name || "<Domain card name>"}</span>
        {editable && (
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
    </Card>
  );
};
