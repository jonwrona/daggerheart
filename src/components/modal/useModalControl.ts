import { useModal } from "./ModalContext";

export const useModalControl = (modalId: string) => {
  const { openModal, closeModal, isModalOpen } = useModal();

  return {
    open: () => openModal(modalId),
    close: () => closeModal(),
    isOpen: isModalOpen(modalId),
    toggle: () => (isModalOpen(modalId) ? closeModal() : openModal(modalId)),
  };
};
