import { Down, Left, Right, Search } from '@icon-park/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { setShowMusicDetails } from '~/redux/slice';

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = (props) => {
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <div className='w-full flex items-center p-4'>
      <div className='cursor-pointer'>
        <Down
          theme='outline'
          size='30'
          fill='#fff'
          onClick={() =>
            dispatch({ type: setShowMusicDetails, payload: false })
          }></Down>
      </div>
      <div className='flex items-center ml-32'>
        <div className='relative ml-5 flex items-center'>
          <input
            className='input h-9 pl-8'
            type='text'
            placeholder='搜索音乐'
          />
          <Search
            className='absolute ml-2'
            theme='outline'
            size='20'
            fill='#d4d1d0'></Search>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
