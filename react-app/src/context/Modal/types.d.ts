import { ReactNode } from 'react';

export interface ContextProps {
  value: ReactNode | undefined;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ModalProps {
  onClose: Function;
  children: ReactNode;
}
