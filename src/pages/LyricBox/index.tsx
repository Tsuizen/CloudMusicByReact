import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useBoxDrag from '~/hooks/useBoxDrag';
import { RootState } from '~/redux/store';
import { SettingTwo, Lock, Close } from '@icon-park/react';
import { setShowLyric } from '~/redux/slice';
import style from './index.module.css';

interface LyricProps {}

const LyricBox: React.FC<LyricProps> = (props) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    useBoxDrag(dragRef.current!); // 拖拽元素
  }, []);

  // 控制歌词显示
  useEffect(() => {
    if (selectState.showLyric) {
      console.log('test')
      dragRef.current!.style.display = 'flex';
    } else {
      console.log('false');
      dragRef.current!.style.display = 'none';
    }
  }, [selectState.showLyric]);

  // 处理每个菜单项的点击
  const handleActionMenu = (name: 'setting' | 'locking' | 'close') => {
    switch (name) {
      case 'setting':
        console.log('setting');
        break;
      case 'locking':
        console.log('locking');
        break;
      case 'close':
        dispatch({ type: setShowLyric, payload: false });
        break;
    }
  };

  return (
    <div className={style.container} ref={dragRef}>
      <ul className='flex w-full justify-end space-x-3 h-12'>
        <li
          className='btn btn-ghost btn-sm btn-circle'
          onClick={() => {
            handleActionMenu('close');
          }}>
          <Close theme='outline' size='17' fill='#fff' />
        </li>
      </ul>
      <h1 className='flex justify-center items-center text-2xl flex-1 w-full'>
        {selectState.currentLyric}
      </h1>
    </div>
  );
};

export default LyricBox;
