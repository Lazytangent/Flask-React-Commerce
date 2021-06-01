import { createContext, useContext, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ContextProps, ProviderProps, ModalProps } from './types.d';
import './Modal.css';

const ModalContext = createContext<Partial<ContextProps>>(null);

export const ModalProvider = ({ children }: ProviderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  )
};

export const Modal = ({ onClose, children }: ModalProps) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
};
