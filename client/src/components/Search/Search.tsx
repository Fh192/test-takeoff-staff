import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import crossIcon from '../../assets/cross.svg';
import searchIcon from '../../assets/search.svg';
import { getContacts } from '../../store/reducers/contactsSlice';
import { transformPhoneNumber } from '../../utils/transformPhoneNumber';
import s from './Search.module.scss';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const clearInput = () => {
    setSearchValue('');
  };

  const setValueHelper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isPhoneNumber = !/[a-z]/i.test(value) && value.length <= 18;

    if (isPhoneNumber) {
      setSearchValue(transformPhoneNumber(value));
    } else {
      setSearchValue(value);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(getContacts(searchValue));
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [dispatch, searchValue]);

  return (
    <div className={s.search}>
      <img className={s.icon} src={searchIcon} alt='' />
      <input
        type='text'
        name='search'
        placeholder='Search contact...'
        autoComplete='off'
        value={searchValue}
        onChange={setValueHelper}
      />
      <button className={s.clear} onClick={clearInput} disabled={!searchValue}>
        <img src={crossIcon} alt='clear' />
      </button>
    </div>
  );
};
