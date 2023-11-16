import React, { useState } from 'react';
import MemberModal from './MemberModal';

const SecondTesting = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [members, setMembers] = useState({});

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMemberSubmit = (data) => {
    setMembers(data);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Member Modal</button>
      <p>Adult Members: {members.adultMembers}</p>
      <p>Kid Members: {members.kidMembers}</p>
      <MemberModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleMemberSubmit}
      />
    </div>
  );
};

export default SecondTesting;
