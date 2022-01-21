import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from '../hooks';
import './App.scss';
import { Login } from './Login/Login';
import { Main } from './Main/Main';

export const App: React.FC = () => {
  const { isAuth } = useSelector(s => s.auth);

  return (
    <div className='App'>
      <Routes>
        {!isAuth ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={'/login'} />} />
          </>
        ) : (
          <>
            <Route path='/contacts' element={<Main />} />
            <Route path='*' element={<Navigate to='/contacts' />} />
          </>
        )}
      </Routes>
    </div>
  );
};
