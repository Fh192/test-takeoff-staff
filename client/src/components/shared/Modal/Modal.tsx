import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOnClickOutside } from '../../../hooks';
import s from './Modal.module.scss';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<Props> = ({ children, open, setOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, close);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={s.modalWrap}>
      <div className={s.modal}>
        <div className={s.content} ref={ref}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
