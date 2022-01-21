import React from 'react';
import { useDispatch } from 'react-redux';
import cross from '../../../assets/cross.svg';
import { deleteContact } from '../../../store/reducers/contactsSlice';
import s from './Delete.module.scss';

interface Props {
  id: number;
}

export const Delete: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button className={s.delete} onClick={() => dispatch(deleteContact(id))}>
      <img src={cross} alt='delete' />
    </button>
  );
};
