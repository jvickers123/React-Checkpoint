import { createPortal } from 'react-dom';

const Backdrop = ({ closeModal }: { closeModal: () => void }) => (
  <div data-testid="backdrop" onClick={closeModal} className="backdrop"></div>
);

const ModalOverlay = ({ children }: { children: JSX.Element }) => (
  <div className="modal">{children}</div>
);

const overlaysRootId = 'overlays';

const Modal = ({
  children,
  closeModal,
}: {
  children: JSX.Element;
  closeModal: () => void;
}) => {
  return (
    <>
      {createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById(overlaysRootId) as HTMLElement
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById(overlaysRootId) as HTMLElement
      )}
    </>
  );
};

export default Modal;
