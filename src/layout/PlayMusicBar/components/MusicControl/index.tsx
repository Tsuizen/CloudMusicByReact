import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';
import { useGetState, useToggle, useUpdateEffect, useCreation } from 'ahooks';
import Lyric from 'lyric-parser';
import { RootState } from '~/redux/store';
import { getLyric, getMusic } from '~/services/api/music';
import { secondToMinute } from '~/utils/BaseUtil';
import { PlayCycle, ShuffleOne, SortOne } from '@icon-park/react';
import {
  CaretRightOutlined,
  HeartOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons';
import Slider from '~/components/Slider';

interface MusicControlProps {}

const MusicControl: React.FC<MusicControlProps> = (props) => {
  const [musicUrl, setMusicUrl] = useState<string>(''); // 当前音乐url
  const [totalSeconds, setTotalSeconds] = useState<number>(0); // 音乐总秒数
  const [seconds, setSeconds, getSeconds] = useGetState<number>(0); // 当前秒数
  const [isPause, { setLeft, setRight }] = useToggle(); // 切换播放状态
  const [playMode, setPlayMode] = useState<'order' | 'random' | 'loop'>(
    'order'
  ); // 播放模式
  const [lyricStr, setLyricStr] = useState<string>(''); // 歌词
  const [lastSeconds, setLastSeconds, getLastSeconds] = useGetState<number>(0); // 进度条最后记录的值
  const timer = useRef<any>(null);

  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const sound = useMemo(
    () =>
      new Howl({
        src: [musicUrl],
        format: ['.webm', '.mp3', '.wav'],
        html5: true,
        xhr: {
          method: 'get'
        },
        autoplay: false,
        preload: 'metadata',
        onload: () => {
          setTotalSeconds(~~sound.duration());
        },
        onend: () => {
          setLeft();
          setSeconds(0);
          dispatch({ type: 'setCurrentLyric', playload: '- - End - -' });
          clearInterval(timer.current);
          timer.current = null;
        }
      }),
    [musicUrl]
  );

  // 歌词对象
  const lyric = useCreation(
    () =>
      new Lyric(lyricStr, (props: { lineNum: any; txt: any }) => {
        dispatch({ type: 'setCurrentLyric', playload: props.txt });
      }),
    [lyricStr]
  );

  // 控制音量
  useEffect(() => {
    if (sound !== null) {
      sound.volume(selectState.currentVolume / 100);
    }
  }, [selectState.currentVolume]);

  // 控制音乐播放进度和歌词进度
  useUpdateEffect(() => {
    if (sound !== null && lyric !== null) {
      sound.seek(getLastSeconds()); // 音乐跳转
      lyric.seek(getLastSeconds() * 1000); // 歌词跳转
    }
  });

  // 加载音乐url和歌词数据
  useEffect(() => {
    setLeft(); // 切换停止按钮
    lyric.stop(); // 停止歌词
    // 获取音乐url
    getMusic(selectState.playSoundId!).then((res: any) => {
      setMusicUrl(res.data[0].url);
    });
    // 获取歌词
    getLyric(selectState.playSoundId!).then((res: any) => {
      lyric.stop(); // 停止歌词
      setLyricStr(res.lrc.lyric);
    });
    return () => {
      sound.unload(); // 清除当前音乐对象
      lyric.stop(); // 停止歌词
      setSeconds(0); // 进度条重制
      clearInterval(timer.current); //清除定时器
      timer.current = null;
    };
  }, [selectState.playSoundId]);

  // 自动播放音乐和开始进度条
  useEffect(() => {
    if (sound !== null && lyric != null) {
      if (selectState.autoPlay) {
        handlePlay();
      }
    }
    return () => {
      sound.unload(); // 清除当前音乐对象
      setSeconds(0); // 进度条重置
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [musicUrl]);

  useEffect(() => {
    handlePause();
  }, []);

  //点击播放
  const handlePlay = () => {
    if (sound !== null && lyric !== null) {
      setRight(); // 切换状态
      sound.play(); // 音乐播放
      lyric.play(getSeconds() * 1000); // 歌词播放
      // 计时器开始
      if (timer.current === null) {
        timer.current = setInterval(() => {
          setSeconds(getSeconds() + 1);
        }, 1000);
      }
    }
  };

  // 点击暂停
  const handlePause = () => {
    if (sound !== null && lyric !== null) {
      setLeft();
      sound.pause();
      lyric.togglePlay();
      //清除计时器
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  return (
    <div className='absolute m-auto left-0 right-0 flex flex-col justify-center space-y-1.5 w-2/6'>
      {/* {控制按钮} */}
      <ul className='flex w-full justify-center items-center space-x-5'>
        {/* 喜欢按钮 */}
        <li className='flex justify-center'>
          <button>
            <HeartOutlined style={{ fontSize: '150%' }} />
          </button>
        </li>
        <li className='flex justify-center'>
          {playMode === 'loop' && (
            <button
              data-tip='单曲循环'
              className='tooltip m-0'
              onClick={() => setPlayMode('random')}>
              <PlayCycle theme='outline' size='22' fill='#000' />
            </button>
          )}
          {playMode === 'random' && (
            <button
              data-tip='随机播放'
              className='tooltip'
              onClick={() => setPlayMode('order')}>
              <ShuffleOne theme='outline' size='22' fill='#000' />
            </button>
          )}
          {playMode === 'order' && (
            <button
              data-tip='顺序播放'
              className='tooltip'
              onClick={() => setPlayMode('loop')}>
              <SortOne theme='outline' size='22' fill='#000' />
            </button>
          )}
        </li>
        {/* 上一首 */}
        <li>
          <button
            data-tip='上一首'
            className='tooltip btn btn-sm btn-circle bg-red-500 border-0 hover:bg-red-500'>
            <StepBackwardOutlined style={{ fontSize: '150%' }} />
          </button>
        </li>
        {/* 播放和暂停 */}
        <li>
          {isPause ? (
            <button
              data-tip='暂停'
              className='tooltip btn  btn-circle btn-outlined  border-0 hover:bg-red-500 bg-red-500'
              onClick={handlePause}>
              <PauseOutlined style={{ fontSize: '200%' }} />
            </button>
          ) : (
            <button
              data-tip='播放'
              className='tooltip btn  btn-circle btn-outlined  border-0 hover:bg-red-500 bg-red-500'
              onClick={handlePlay}>
              <CaretRightOutlined style={{ fontSize: '200%' }} />
            </button>
          )}
        </li>
        {/* 下一首 */}
        <li>
          <button
            data-tip='下一首'
            className='tooltip btn btn-sm btn-circle bg-red-500 border-0 hover: bg-red-500 hover:bg-red-500'>
            <StepForwardOutlined style={{ fontSize: '150%' }} />
          </button>
        </li>
        {/* 歌词显示 */}
        <li>
          <span
            className={`cursor-pointer ${
              selectState.showLyric === true ? 'text-purple-500' : ''
            } hover:text-purple-500`}
            onClick={() => {
              dispatch({ type: 'setShowLyric', payload: true });
            }}>
            词
          </span>
        </li>
      </ul>
      {/* 进度条 */}
      <div className='w-full h-2.5 flex items-center'>
        <span className='w-10 text-center mr-3'>{secondToMinute(seconds)}</span>
        <Slider />
        <span className='w-10 text-center ml-3'>
          {secondToMinute(totalSeconds)}
        </span>
      </div>
    </div>
  );
};

export default MusicControl;
