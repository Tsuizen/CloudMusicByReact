import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/redux/store';
import { MusicList, Share, VolumeNotice } from '@icon-park/react';
import { useEventListener } from 'ahooks';
import VolumeControl from './components/VolumeControl';

interface OptionListProps {}

const OptionList: React.FC<OptionListProps> = (props) => {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const selectorState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const volumeRef = useRef<HTMLButtonElement>(null);
  const volumeControlRef = useRef() as any;

  // 显示音量控制
  useEventListener(
    'mouseenter',
    () => {
      volumeControlRef.current.showVolumeControl;
    },
    { target: volumeRef }
  );

  return (
    <div>
      <ul className='flex items-center space-x-6 mr-4'>
        <li className='flex items-center'>
          <button data-tip='分享好友' className='tooltip'>
            <Share theme='outline' size='22' fill='#5e5e5e' />
          </button>
        </li>
        <li className='flex items-center'>
          <button
            data-tip='调节音量'
            className='tooltip tooltip-bottom'
            ref={volumeRef}>
            <VolumeNotice theme='outline' size='22' fill='#5e5e5e' />
          </button>
        </li>
        <li className='flex items-center'>
          <button
            id='playListBtn'
            data-tip='播放列表'
            className='tooltip'
            onClick={() => {
              dispatch({ type: 'setShowPlayList', payload: true });
            }}>
            <MusicList theme='outline' size='22' fill='#5e5e5e' />
          </button>
        </li>
      </ul>
      {/* 调节音量 */}
      <VolumeControl
        onRef={volumeControlRef}
        show={showSlider}
        setShow={setShowSlider}></VolumeControl>
    </div>
  );
};

export default OptionList;
