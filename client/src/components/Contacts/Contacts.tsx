import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../hooks';
import { getContacts } from '../../store/reducers/contactsSlice';
import { Contact } from '../Contact/Contact';
import { Search } from '../Search/Search';
import s from './Contacts.module.scss';

export const Contacts: React.FC = () => {
  const dispatch = useDispatch();

  const { contacts } = useSelector(s => s.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={s.contacts}>
      <Search />
      <div className={s.list}>
        {contacts.map(contact => (
          <Contact {...contact} key={contact.id} />
        ))}
      </div>
    </div>
  );
};
