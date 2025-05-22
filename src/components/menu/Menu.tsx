"use client";
import { useState, createContext, useContext } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import styles from "./Menu.module.scss";

const MenuContext = createContext({
  openMenu: "",
  handleMenuClick: (menu: string, forceClose?: boolean) => {},
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
        {children}
      </MenuContext.Provider>
    </nav>
  );
};

interface MenuItemProps {
  label: string;
  children?:
    | React.ReactElement<typeof MenuItemOption>
    | React.ReactElement<typeof MenuItemOption>[];
}

export const MenuItem = ({ label, children }: MenuItemProps) => {
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
        <div ref={ref} className={`${styles.menuItemOptions}`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuItemOptionProps {
  label: string;
  onClick: () => void;
}

export const MenuItemOption = ({ label, onClick }: MenuItemOptionProps) => {
  return (
    <button className={styles.menuItemOption} onClick={onClick}>
      {label}
    </button>
  );
};

export const MenuItemDivider = () => {
  return <div className={`${styles.menuItemDivider}`} />;
};
