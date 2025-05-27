"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface ModalContextType {
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  isModalOpen: (modalId: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = useCallback(
    (modalId: string) => setActiveModal(modalId),
    []
  );

  const closeModal = useCallback(() => setActiveModal(null), []);

  const isModalOpen = useCallback(
    (modalId: string) => activeModal === modalId,
    [activeModal]
  );

  const contextValue = useMemo(
    () => ({
      activeModal,
      openModal,
      closeModal,
      isModalOpen,
    }),
    [activeModal, openModal, closeModal, isModalOpen]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
