import styles from "./ScrollToTop.module.scss";
import { Icon } from "../icon/Icon";

export const ScrollToTop = () => {
  return (
    <a href="#" className={styles.scrollToTop} aria-label="Scroll to top">
      <Icon name="arrow_upward" />
    </a>
  );
};

export default ScrollToTop;
