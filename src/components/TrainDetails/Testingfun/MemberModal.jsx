import React, { useState } from 'react';
import Modal from 'react-modal';

const MemberModal = ({ isOpen, onClose, onSubmit }) => {
  const [adultMembers, setAdultMembers] = useState(0);
  const [kidMembers, setKidMembers] = useState(0);

  const handleAdultChange = (e) => {
    setAdultMembers(parseInt(e.target.value, 10) || 0);
  };

  const handleKidChange = (e) => {
    setKidMembers(parseInt(e.target.value, 10) || 0);
  };

  const handleSubmit = () => {
    onSubmit({
      adultMembers,
      kidMembers,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Member Modal"
    >
      <h2>Enter Number of Members</h2>
      <label>
        Adults:
        <input
          type="number"
          value={adultMembers}
          onChange={handleAdultChange}
        />
      </label>
      <br />
      <label>
        Kids:
        <input
          type="number"
          value={kidMembers}
          onChange={handleKidChange}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default MemberModal;
