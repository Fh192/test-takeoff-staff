import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addContact,
  updateContact,
} from '../../../store/reducers/contactsSlice';
import { IContact, IContactOmitId } from '../../../types/contacts';
import { transformPhoneNumber } from '../../../utils/transformPhoneNumber';
import s from './ContactForm.module.scss';

interface Props {
  type: 'add' | 'edit';
  contact?: IContact;
  onCancel: () => void;
}

export const ContactForm: React.FC<Props> = ({ contact, type, onCancel }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<IContactOmitId>({
    phone_number: contact?.phone_number || '',
    name: contact?.name || '',
  });

  const setValuesHelper = (key: keyof IContactOmitId) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        key === 'name' ? e.target.value : transformPhoneNumber(e.target.value);

      setValues(values => ({ ...values, [key]: value }));
    };
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'add') {
      dispatch(addContact(values));
    } else if (type === 'edit' && contact) {
      dispatch(updateContact({ id: contact.id, contact: values }));
    }

    onCancel();
  };

  return (
    <form className={s.form} onSubmit={submitHandler}>
      <h2 className={s.title}>{type === 'add' ? 'Add' : 'Edit'} contact</h2>
      <fieldset className={s.fieldset}>
        <div className={s.field}>
          <label className={s.required} htmlFor='phoneNumber'>
            Phone number
          </label>
          <input
            type='tel'
            id='phoneNumber'
            maxLength={18}
            required
            value={values.phone_number}
            onChange={setValuesHelper('phone_number')}
          />
        </div>
        <div className={s.field}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={values.name}
            onChange={setValuesHelper('name')}
          />
        </div>
      </fieldset>
      <div className={s.buttons}>
        <button className={s.cancel} type='button' onClick={onCancel}>
          Cancel
        </button>
        <button
          className={s.submit}
          type='submit'
          disabled={values.phone_number.length !== 18}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
