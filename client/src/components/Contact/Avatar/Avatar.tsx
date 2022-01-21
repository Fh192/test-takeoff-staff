import React, { useMemo } from 'react';
import contactAvatar from '../../../assets/contactAvatar.png';
import { getRandomColor } from '../../../utils/getRandomColor';
import s from './Avatar.module.scss';

interface Props {
  name: string;
}

export const Avatar: React.FC<Props> = ({ name }) => {
  const backgroundColor = useMemo(getRandomColor, []);

  return (
    <div
      className={s.avatar}
      style={{
        backgroundColor,
      }}
    >
      {name ? name[0].toUpperCase() : <img src={contactAvatar} alt='' />}
    </div>
  );
};
