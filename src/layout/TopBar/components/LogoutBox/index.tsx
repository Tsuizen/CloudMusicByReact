import { Logout } from '@icon-park/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogout } from '~/redux/slice';

interface ILogoutBoxProps {
  show: boolean;
  logoutBoxRef: any;
  setShowLogoutBox: (value: boolean) => void;
}

const LogoutBox: React.FC<ILogoutBoxProps> = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: setUserLogout
    });
    props.setShowLogoutBox(false);
  };

  return (
    <div
      ref={props.logoutBoxRef}
      className='flex bg-gray-100 rounded-md absolute top-14 z-50 px-10 py-2'
      style={{ visibility: props.show ? 'visible' : 'hidden' }}>
      <button className='flex' onClick={handleLogout}>
        <Logout theme='filled' size='24' fill='#333' />
        退出登录
      </button>
    </div>
  );
};

export default LogoutBox;
