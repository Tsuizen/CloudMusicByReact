import { Down } from '@icon-park/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = (props) => {
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return <div className='flex-1 w-full p-5'>歌曲详情</div>;
};

export default MainContent;
