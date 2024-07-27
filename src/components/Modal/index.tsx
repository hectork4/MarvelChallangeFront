import "./styles.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

function Modal({ children, onClose, title }: ModalProps) {
  const handleModalDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal"
      onClick={onClose}
      aria-labelledby="modal-title"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className="content-modal" onClick={handleModalDialogClick}>
        <button className="close-btn" onClick={onClose}>
          ❌
        </button>
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}

export default function ModalPortal({
  children,
  onClose,
  title = "",
}: ModalProps) {
  return createPortal(
    <Modal onClose={onClose} title={title}>
      {children}
    </Modal>,
    document.getElementById("modal-root")!
  );
}
