import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../hooks';
import { login, setError } from '../../store/reducers/authSlice';
import { ILogin } from '../../types/auth';
import s from './Login.module.scss';
import { SubmitBtn } from './SubmitBtn/SubmitBtn';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const { error } = useSelector(s => s.auth);
  const [formState, setFormState] = useState<ILogin>({
    email: '',
    password: '',
  });

  const fieldChangeHandler = (field: keyof ILogin) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormState(values => ({ ...values, [field]: value }));
      if (error) dispatch(setError(null));
    };
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formState));
  };

  return (
    <div className={s.login}>
      <form className={s.form} onSubmit={submitHandler}>
        <h2 className={s.title}>Sign in</h2>
        <fieldset className={s.fieldset}>
          <input
            className={s.field}
            type='email'
            placeholder='Email'
            autoFocus={true}
            value={formState.email}
            onChange={fieldChangeHandler('email')}
          />
          <input
            className={s.field}
            type='password'
            placeholder='Password'
            value={formState.password}
            onChange={fieldChangeHandler('password')}
          />
        </fieldset>
        <SubmitBtn />
      </form>
    </div>
  );
};
