import styles from "./DomainCard.module.scss";

import {
  Card,
  CardHeader,
  CardSection,
  type CardProps,
} from "@/components/card/Card";
import { Icon } from "../icon/Icon";
import type { DomainCard as DomainCardType } from "@/types/daggerheart/daggerheart";
import type { DomainCardDB } from "@/db";
import { capitalize } from "@/utils/capitalize";
import { Modal, useModalControl } from "@/components/modal";
import { shortCode } from "@/utils/shortCode";

interface DomainCardProps extends Partial<CardProps> {
  card: DomainCardType | DomainCardDB;
  onEdit?: () => void;
}

const DomainCardEditModal = ({
  id,
  card,
}: {
  id: string;
  card: DomainCardType;
}) => {
  return <Modal id={id}>{JSON.stringify(card)}</Modal>;
};

export const DomainCard = ({ card, onEdit, ...rest }: DomainCardProps) => {
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
        <span>{name}</span>
        {isEditable && (
          <Icon name="edit_note" size="1.25rem" className={styles.icon} />
        )}
      </CardHeader>
      <CardSection className="small">
        <p>
          Level {level} {capitalize(domain)} {capitalize(type)}
          <br />
          Recall cost: {recallCost}
        </p>
      </CardSection>
      <CardSection className="small">{feature}</CardSection>
      {isEditable && <DomainCardEditModal id={modalId} card={card} />}
    </Card>
  );
};
