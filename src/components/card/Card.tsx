import React from "react";
import styles from "./Card.module.scss";

export interface CardProps {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h5
      className={`${styles.cardHeader} ${styles.cardSection} ${
        className || ""
      }`}
    >
      {children}
    </h5>
  );
};

export interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  clickableParent?: boolean;
}

export const CardSection = ({
  children,
  className,
  onClick,
  clickableParent,
}: CardSectionProps) => {
  const isClickable = !!onClick && !clickableParent;
  const Component = isClickable ? "button" : "div";
  return (
    <Component
      className={`${styles.cardSection} ${className || ""}`}
      onClick={onClick}
      data-clickable={isClickable}
    >
      {children}
    </Component>
  );
};

export const Card = ({ className = "", children, onClick }: CardProps) => {
  // Determine the wrapper type based on the presence of onClick
  const isClickable = !!onClick;
  const Component = isClickable ? "button" : "div";

  // Clone children and inject clickableParent prop only if the child accepts it
  const enhancedChildren = React.Children.map(children, (child) => {
    if (
      React.isValidElement<CardSectionProps>(child) &&
      child.type === CardSection
    ) {
      return React.cloneElement(child, {
        clickableParent: isClickable,
      });
    }
    return child;
  });

  return (
    <Component
      className={`${className} ${styles.card}`}
      onClick={onClick}
      data-clickable={isClickable}
    >
      {enhancedChildren}
    </Component>
  );
};
