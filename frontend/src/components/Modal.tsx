import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
};

export default Modal;

