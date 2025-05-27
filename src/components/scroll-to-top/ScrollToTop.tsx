import React, { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";
import { Icon } from "../icon/Icon";

const SCROLL_THRESHOLD = 100;

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setVisible(window.scrollY > SCROLL_THRESHOLD);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // check on mount
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  if (!visible) return null;

  return (
    <a href="#" className={styles.scrollToTop} aria-label="Scroll to top">
      <Icon name="arrow_upward" />
    </a>
  );
};

export default ScrollToTop;
