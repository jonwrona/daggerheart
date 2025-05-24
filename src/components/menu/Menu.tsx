"use client";
import React, { useState, createContext, useContext } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import styles from "./Menu.module.scss";
import Link from "next/link";

interface MenuContextType {
  openMenu: string;
  handleMenuClick: (menu: string, forceClose?: boolean) => void;
}

const MenuContext = createContext<MenuContextType>({
  openMenu: "",
  handleMenuClick: () => {},
});

interface MenuProps {
  children?:
    | React.ReactElement<typeof MenuItem>
    | React.ReactElement<typeof MenuItemOption>[];
}

export const Menu = ({ children }: MenuProps) => {
  const [openMenu, setOpenMenu] = useState("");

  const handleMenuClick = (menu: string, forceClose?: boolean) => {
    // Close the menu if it's already open or forceClose is true
    if (openMenu === menu || forceClose) {
      setOpenMenu("");
    } else {
      setOpenMenu(menu);
    }
  };

  return (
    <nav className={`${styles.menu}`}>
      <MenuContext.Provider value={{ openMenu, handleMenuClick }}>
        <MenuItem label="Daggerheart">
          <MenuItemLink href="/">Home</MenuItemLink>
          <MenuItemLink href="/sheet">Character Sheet</MenuItemLink>
          <MenuItemLink href="/data">Data Management</MenuItemLink>
          <MenuItemDivider />
          <MenuItemLink href="/settings">Settings</MenuItemLink>
        </MenuItem>
        {children}
        <MenuItem label="Help">
          <MenuItemLink
            href="https://github.com/jonwrona/daggerheart/issues/new"
            target="_blank"
          >
            Report Issue
          </MenuItemLink>
        </MenuItem>
      </MenuContext.Provider>
    </nav>
  );
};

export const MenuSpacer = () => <div className={styles.menuSpacer} />;

interface MenuItemProps {
  label: string;
  children?:
    | React.ReactElement<typeof MenuItemOption>
    | React.ReactElement<typeof MenuItemOption>[];
  align?: "left" | "right";
}

export const MenuItem = ({
  label,
  children,
  align = "left",
}: MenuItemProps) => {
  const { openMenu, handleMenuClick } = useContext(MenuContext);
  const isOpen = openMenu === label;

  const ref = useClickAway<HTMLDivElement>(() => {
    if (isOpen) handleMenuClick(label, true);
  });
  return (
    <div className={`${styles.menuItem} ${isOpen && styles.open}`}>
      <button
        onClick={() => !isOpen && handleMenuClick(label)}
        className={`${styles.menuItemButton} ${isOpen && styles.open}`}
      >
        {label}
      </button>
      {isOpen && (
        <div ref={ref} className={`${styles.menuItemOptions} ${styles[align]}`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuItemOptionProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItemOption = ({
  children,
  disabled,
  onClick,
}: MenuItemOptionProps) => {
  const { handleMenuClick } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    handleMenuClick("", true); // Close the menu after clicking
  };

  return (
    <button
      className={`${styles.menuItemOption} ${
        (disabled || !onClick) && styles.disabled
      }`}
      onClick={!disabled ? handleClick : undefined}
    >
      {children}
    </button>
  );
};

interface MenuItemLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export const MenuItemLink: React.FC<MenuItemLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const { handleMenuClick } = useContext(MenuContext);

  const handleClick = () => {
    handleMenuClick("", true);
  };

  return (
    <Link
      {...props}
      href={href}
      className={styles.menuItemOption}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export const MenuItemDivider = () => {
  return <div className={`${styles.menuItemDivider}`} />;
};
