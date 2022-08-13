import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import MainContent from './components/MainContent';
import TopBar from './components/TopBar';

interface MusicDetailsProps {}

const MusicDetails: React.FC<MusicDetailsProps> = (props) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // 控制页面显示和隐藏
  useEffect(() => {
    if (selectState.showMusicDetails) {
      slideRef.current!.style.transform = 'translateY(-100%)';
    } else {
      slideRef.current!.style.transform = 'translateY(100%)';
    }

    return () => {};
  }, [selectState.showMusicDetails]);

  return (
    <div
      className='flex flex-col justify-between w-screen h-screen absolute left-0 bg-white z-50 top-full transition duration-500 ease-in-out'
      ref={slideRef}
      style={{ willChange: 'transform' }}>
      <TopBar></TopBar>
      <MainContent></MainContent>
    </div>
  );
};

export default MusicDetails;
