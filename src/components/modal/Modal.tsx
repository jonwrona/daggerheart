import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";
import { useModal } from "./ModalContext";

interface ModalProps {
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ id, children, onClose }) => {
  const { isModalOpen, closeModal } = useModal();
  const isOpen = isModalOpen(id);

  const handleClose = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      closeModal();
      onClose?.();
    },
    [closeModal, onClose]
  ); // Handle ESC key press and prevent background scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        console.log("Escape key pressed, closing modal");
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      // Prevent background scroll while allowing modal overlay to scroll
      const originalPosition = document.body.style.position;
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.position = originalPosition;
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo({
          top: scrollY,
          left: 0,
          behavior: "instant",
        });
      };
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={(e) => handleClose(e)}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
