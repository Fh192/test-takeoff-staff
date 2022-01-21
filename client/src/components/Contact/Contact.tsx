import React, { useState } from 'react';
import openEditIcon from '../../assets/edit.svg';
import { IContact } from '../../types/contacts';
import { ContactForm, Modal } from '../shared';
import { Avatar } from './Avatar/Avatar';
import s from './Contact.module.scss';
import { Delete } from './Delete/Delete';

export const Contact: React.FC<IContact> = contact => {
  const { phone_number, name, id } = contact;
  const [editMode, setEditMode] = useState(false);

  return (
    <div className={s.contact}>
      <div className={s.main}>
        <Avatar name={name} />

        <Modal open={editMode} setOpen={setEditMode}>
          <ContactForm
            type='edit'
            contact={contact}
            onCancel={() => setEditMode(false)}
          />
        </Modal>

        <div className={s.info}>
          <span className={s.name}>
            {name || phone_number}
            <img
              className={s.openEdit}
              onClick={() => setEditMode(v => !v)}
              src={openEditIcon}
              alt='edit'
            />
          </span>
          {name && <span className={s.phoneNumber}>{phone_number}</span>}
        </div>

        <div className={s.delete}>
          <Delete id={id} />
        </div>
      </div>
    </div>
  );
};
