import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuList, myMusic, songList } from '../../config/menuConfig';
import { Down, Plus } from '@icon-park/react';
import { MenuType } from '~/types';
import './index.css';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = (props) => {
  const [activeMenu, setActiveMenu] = useState<string>();

  const navigate = useNavigate(); // 路由导航

  // 点击菜单
  const handleClickMenu = (item: MenuType) => {
    setActiveMenu(item.title);
    navigate(`/${item.url}`, {});
  };

  // 控制路由
  useEffect(() => {}, [activeMenu]);

  return (
    <div className='border-r-2 p-3 w-56' style={{ background: '#ededed' }}>
      <div>
        <ul>
          {menuList.map((item) => {
            return (
              <li
                onClick={() => {
                  handleClickMenu(item);
                }}
                key={item.key}
                className={`
              flex items-center pl-2 transition duration-200 ease-in-out
             h-10 cursor-pointer rounded-sm menu-list ${
               activeMenu === item.title ? 'text-red-500 menu-list-bg' : ''
             }
        
            `}>
                <item.icon theme='outline' size='18' className='p-2' />
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>

      <div className='text-sm text-gray-400 w-full pl-2 my-3'>我的音乐</div>
      <ul>
        {myMusic.map((item) => {
          return (
            <li
              onClick={() => {
                handleClickMenu(item);
              }}
              key={item.key}
              className={`
              flex items-center pl-2 transition duration-200 ease-in-out
             h-10 cursor-pointer rounded-sm menu-list ${
               activeMenu === item.title ? 'text-red-500 menu-list-bg' : ''
             }
        
            `}>
              <item.icon theme='outline' size='18' className='p-2' />
              {item.title}
            </li>
          );
        })}
      </ul>
      <div className='text-sm text-gray-400 w-full pl-2 my-3 flex items-center justify-between cursor-pointer'>
        <span>创建的歌单</span>
        <Down className='flex-1' theme='outline' size='16' fill='#575757' />
        <Plus theme='outline' size='19' fill='#575757' />
      </div>
      <div>
        <ul>
          {songList.map((item) => {
            return (
              <li
                onClick={() => {
                  handleClickMenu(item);
                }}
                key={item.key}
                className={`
              flex items-center pl-2 transition duration-200 ease-in-out
             h-10 cursor-pointer rounded-sm menu-list ${
               activeMenu === item.title ? 'text-red-500 menu-list-bg' : ''
             }
        
            `}>
                <item.icon theme='outline' size='18' className='p-2' />
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
