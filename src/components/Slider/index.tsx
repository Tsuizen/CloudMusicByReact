import { useEventListener, useHover, useUpdateEffect } from 'ahooks';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

interface SliderProps {
  value: number; // 当前值
  totalValue: number; //总值
  setValue: (value: number) => void;
  vertical?: true;
  onRef?: any;
  setLastValue?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = (props) => {
  const progressRef = useRef<HTMLProgressElement>(null); // 进度条节点
  const progressBoxRef = useRef<HTMLDivElement>(null); // 进度条盒子节点
  const signRef = useRef<HTMLSpanElement>(null); // 进度条指示器

  const isHovering = useHover(progressBoxRef); // 监听是否悬浮进度条
  const signPosition = useRef<number>(0); // 按下指示器的位置
  const activeValue = useRef<number>(0); // 按下时的值
  const [isSlide, setIsSlide] = useState<boolean>(false); // 是否滑动

  let lastValue = useRef<number>(0); // 最后离开时的值

  // 监听点击进度条
  useEventListener(
    'click',
    (e) => {
      let progressWidth = progressRef.current!.offsetWidth;
      let activeValue = (e.offsetX * props.totalValue) / progressWidth;

      props.setValue(activeValue);
      if (props.setLastValue) {
        props.setLastValue(activeValue);
      }
    },
    { target: progressBoxRef }
  );

  // 监听指示器的移动
  useEventListener(
    'mousedown',
    (e) => {
      if (props.vertical) {
        signPosition.current = e.clientY;
      } else {
        signPosition.current = e.clientX;
      }

      setIsSlide(true);
      activeValue.current = props.value;
    },
    { target: signRef }
  );

  // 监听鼠标移动
  useEventListener(
    'mousemove',
    (e) => {
      if (isSlide) {
        if (props.vertical) {
          let moveY = signPosition.current - e.clientY; // 鼠标从点击起移动的距离
          let progressWidth = progressRef.current?.offsetWidth;
          let stepValue = ~~(moveY / progressWidth! * props.totalValue + activeValue.current);

          props.setValue(stepValue);
        } else {
          let moveX = e.clientX - signPosition.current;
          let progressWidth = progressRef.current?.offsetWidth;
          let stepValue = ~~(moveX / progressWidth! * props.totalValue + activeValue.current);
          if (stepValue < 0) {
            stepValue = 0;
          } else if (stepValue > props.totalValue) {
            stepValue = props.totalValue;
          }

          lastValue.current = stepValue; // 离开时的值
          props.setValue(stepValue + 5);
        }
      }
    },
    { target: document }
  );

  // 监听鼠标离开
  useEventListener(
    'mouseup',
    () => {
      setIsSlide(false);
    },
    { target: document }
  );

  // 监听是否滑动, 只在依赖更新时执行
  useUpdateEffect(() => {
    if (isSlide === false) {
      if (props.setLastValue) {
        props.setLastValue(lastValue.current);
      }
    }
  }, [isSlide]);

  useEffect(() => {
    synchronizationPosition();
  }, []);

  //监听seconds的变化
  useUpdateEffect(() => {
    synchronizationPosition();
  }, [props.value]);

  //暴露给父组件的方法
  useImperativeHandle(props.onRef, () => {
    return {
      synchronizationPosition
    };
  });

  // 同步位置xx xx x zz z x df ds d
  const synchronizationPosition = () => {
    let progressWidth = progressRef.current!.offsetWidth; // 进度条宽度
    let stepValue = progressWidth! / props.totalValue; // 当前步长（px/s）
    // console.log('stepValue2', stepValue);
    // 设置指示器位置
    signRef.current!.style.left = `${stepValue * props.value}px`;
    
    // props.value值不在规定范围内时重置
    if (props.value >= props.totalValue) {
      props.setValue(props.totalValue);
      setIsSlide(false);
    } else if (props.value <= 0) {
      props.setValue(0);
      setIsSlide(false);
    }
  };

  return (
    <div
      className={`flex-1 relative h-2.5 flex items-center ${
        props.vertical ? 'w-auto' : ''
      }`}
      ref={progressBoxRef}>
      {/* 进度条 */}
      <progress
        className={`progress progress-error  bg-gray-300 ${
          isHovering ? 'h-1.5 shadow-sm' : 'h-1'
        } rounded-md`}
        style={{ accentColor: 'red' }}
        ref={progressRef}
        value={props.value}
        max={props.totalValue}></progress>
      {/* 指示器 */}
      <span className='flex h-2.5 w-2.5 absolute cursor-pointer' ref={signRef}>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70'></span>
      </span>
    </div>
  );
};
export default Slider;
