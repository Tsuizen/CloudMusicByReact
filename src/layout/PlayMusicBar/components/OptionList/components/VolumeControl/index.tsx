import { useClickAway } from 'ahooks';
import React, { useState, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '~/components/Slider';
import { RootState } from '~/redux/store';

interface VolumeControlProps {
  show: boolean;
  setShow: (value: boolean) => void;
  onRef?: any;
}

const VolumeControl: React.FC<VolumeControlProps> = (props) => {
  const [totalVolume, setTotalVolume] = useState<number>(100);

  const progressBoxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLProgressElement>() as any;

  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // 隐藏音量控制
  useClickAway(() => {
    props.setShow(false);
  }, progressBoxRef);

  // 显示音量控制
  const showVolumeControl = () => {
    props.setShow(true);
    progressRef.current.synchronizationPosition();
  };

  useImperativeHandle(props.onRef, () => ({
    showVolumeControl
  }));

  return (
    <div
      ref={progressBoxRef}
      className='w-56 absolute bottom-44 -right-5 bg-gray-600 p-3 rounded-sm'
      style={{
        transform: 'rotate(-90deg)',
        display: `${props.show ? 'block' : 'none'}`
      }}>
      <Slider
        onRef={progressRef}
        totalValue={totalVolume}
        vertical
        value={selectState.currentVolume}
        setValue={(value) => {
          dispatch({ type: 'setCurrentVolume', playload: value });
        }}></Slider>
    </div>
  );
};

export default VolumeControl;
