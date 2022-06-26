import {
  FullScreen,
  HamburgerButton,
  Mail,
  OffScreen,
  Platte
} from '@icon-park/react';
import { useFullscreen } from 'ahooks';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import avatarUrl from '~/assets/images/profile-pic.png';
interface ActionMenuProps {}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEnabled, { enterFullscreen, exitFullscreen }] = useFullscreen(
    document.querySelector('html')
  );

  return (
    <ul className={styles.menuList}>
      <li>
        <div className='indicator mr-5'>
          <div className='indicator-item badge bg-gray-500 text-xs'>1</div>
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
          <div data-tip='全屏' className='tooltip tooltip-bottom'>
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
            <img src={avatarUrl} alt='' />
          </div>
        </div>
        {isLogin ? (
          <span className='ml-2 mr-1'>Tsuizen</span>
        ) : (
          <button
            className='btn btn-sm btn-ghost ml-2'
            onClick={() => {
              dispatch({ type: 'setShowLoginBox', payload: true });
            }}>
            未登录
          </button>
        )}
      </li>
      <li>
        {isLogin ? (
          <button
            className='btn btn-ghost btn-sm rounded-btn'
            onClick={() => {
              dispatch({ type: 'setShowDrawer', payload: true });
            }}>
            <HamburgerButton theme='outline' size='28' fill='#fff' />
          </button>
        ) : (
          <></>
        )}
      </li>
    </ul>
  );
};

export default ActionMenu;
