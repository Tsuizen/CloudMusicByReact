import { FullScreen, Mail, OffScreen, RightOne, User } from '@icon-park/react';
import { useClickAway, useFullscreen } from 'ahooks';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import avatarUrl from '~/assets/images/format.ico';
import LoginBox from '../LoginBox';
import { RootState } from '~/redux/store';
import storageUtils from '~/utils/storageUtils';
import LogoutBox from '../LogoutBox';

interface ActionMenuProps {}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showLoginBox, setShowLoginBox] = useState<boolean>(false);
  const [showLogoutBox, setShowLogoutBox] = useState<boolean>(false);
  const loginRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);
  const loginBoxRef = useRef<HTMLDivElement>(null);
  const logoutBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const selectState = useSelector((state: RootState) => state);
  const userInfo = selectState.user;

  const [isEnabled, { enterFullscreen, exitFullscreen }] = useFullscreen(
    document.querySelector('html')
  );

  useEffect(() => {
    const loginState: boolean = selectState.isLogin;
    setIsLogin(loginState);
  }, [selectState]);

  useClickAway(() => {
    setShowLoginBox(false);
  }, [loginRef, loginBoxRef]);

  useClickAway(() => {
    setShowLogoutBox(false);
  }, [logoutRef, logoutBoxRef]);

  return (
    <ul className={styles.menuList}>
      <li>
        <div className='indicator mr-5'>
          <button className='btn btn-ghost btn-sm rounded-btn'>
            <Mail theme='outline' size='24' fill='#fff' />
          </button>
        </div>
      </li>
      <li>
        {isEnabled ? (
          <div data-tip='缩小' className='tooltip tooltip-bottom'>
            <button
              className='btn btn-ghost btn-sm rounded-btn'
              onClick={exitFullscreen}>
              <OffScreen theme='outline' size='24' fill='#fff' />
            </button>
          </div>
        ) : (
          <div>
            <button
              className='btn btn-ghost btn-sm rounded-btn'
              onClick={enterFullscreen}>
              <FullScreen theme='outline' size='24' fill='#fff' />
            </button>
          </div>
        )}
      </li>
      <div className='divider divider-vertical'></div>
      <li>
        <div className='avatar online'>
          <div className='w-10 h-10 mask mask-squircle'>
            {isLogin ? (
              <img src={userInfo.profile.avatarUrl} alt='' />
            ) : (
              <img src={avatarUrl}></img>
            )}
          </div>
        </div>
        {isLogin ? (
          <div className='flex'>
            <span className='ml-2 mr-1' style={{ color: '#fff' }}>
              {userInfo.profile.nickname}
            </span>
            <button
              ref={logoutRef}
              onClick={() => {
                setShowLogoutBox(true);
              }}>
              <RightOne theme='filled' size='24' fill='#fff' />
            </button>
          </div>
        ) : (
          <button
            ref={loginRef}
            className='btn btn-sm btn-ghost ml-2 text-white'
            onClick={() => {
              setShowLoginBox(true);
            }}>
            未登录
          </button>
        )}
      </li>
      <LoginBox
        show={showLoginBox}
        loginBoxRef={loginBoxRef}
        setShowLoginBox={setShowLoginBox}
      />
      <LogoutBox
        show={showLogoutBox}
        setShowLogoutBox={setShowLogoutBox}
        logoutBoxRef={logoutBoxRef}
      />
    </ul>
  );
};

export default ActionMenu;
