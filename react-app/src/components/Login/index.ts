import { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './Login';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
