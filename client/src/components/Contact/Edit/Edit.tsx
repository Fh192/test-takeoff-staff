import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../../store/reducers/contactsSlice';
import { IContact, IContactOmitId } from '../../../types/contacts';
import { transformPhoneNumber } from '../../../utils/transformPhoneNumber';
import s from './Edit.module.scss';

interface Props extends IContact {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Edit: React.FC<Props> = ({
  id,
  phone_number,
  name,
  setEditMode,
}) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<IContactOmitId>({
    phone_number,
    name,
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

    dispatch(updateContact({ id, contact: values }));

    setEditMode(false);
  };

  return (
    <form className={s.edit} onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='name'
        value={values.name}
        onChange={setValuesHelper('name')}
      />
      <input
        type='tel'
        id='phoneNumber'
        maxLength={18}
        required
        value={values.phone_number}
        onChange={setValuesHelper('phone_number')}
      />
      <div className={s.buttons}>
        <button
          className={s.cancel}
          type='button'
          onClick={() => setEditMode(false)}
        >
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
