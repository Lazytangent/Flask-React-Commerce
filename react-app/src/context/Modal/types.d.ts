import { ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

export interface ModalProps {
  onClose: React.MouseEventHandler;
  children: ReactNode;
}
