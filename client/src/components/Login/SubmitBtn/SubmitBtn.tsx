import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from '../../../hooks';
import { Preloader } from '../../shared';
import s from './SubmitBtn.module.scss';

export const SubmitBtn: React.FC = () => {
  const cn = classNames.bind(s);
  const { error, fetching } = useSelector(s => s.auth);
  const disabled = Boolean(error) || fetching;

  return (
    <button className={cn('submitBtn', { error })} disabled={disabled}>
      {fetching ? <Preloader size='30px' /> : error || 'Login'}
    </button>
  );
};
