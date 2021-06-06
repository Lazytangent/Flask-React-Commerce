import { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './Signup';

const SignupModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Signup</button>
  {showModal && (
    <Modal onClose={() => setShowModal(false)}>
      <SignupForm />
        </Modal>
  )}
    </>
  );
};

export default SignupModal;
