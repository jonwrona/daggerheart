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
  );

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        console.log("Escape key pressed, closing modal");
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
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
