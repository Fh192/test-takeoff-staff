import React from 'react';
import { AddContact } from '../AddContact/AddContact';
import { Contacts } from '../Contacts/Contacts';
import s from './Main.module.scss'

export const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <AddContact />
      <Contacts />
    </main>
  );
};
