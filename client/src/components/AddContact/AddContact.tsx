import React, { useState } from 'react';
import addImg from '../../assets/addContact.svg';
import { ContactForm, Modal } from '../shared';
import s from './AddContact.module.scss';

export const AddContact: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setOpenModal(val => !val);
  };

  return (
    <>
      <button className={s.button} onClick={toggleOpenModal}>
        <img src={addImg} alt='' />
        Add contact
      </button>
      <Modal open={openModal} setOpen={setOpenModal}>
        <ContactForm type='add' onCancel={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};
