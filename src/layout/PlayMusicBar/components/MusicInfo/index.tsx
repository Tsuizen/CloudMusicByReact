import { Down, Download, FolderPlus, Like } from '@icon-park/react';
import { useEventListener, useTitle } from 'ahooks';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/redux/store';
import { getMusicDetail } from '~/services/api/music';
// import { HeartOutlined } from '@ant-design/icons';

import styles from './index.module.css';
interface MusicInfoProps {}

type MusicInfoType = {
  name: string;
  picUrl: string;
  artist: string;
};

const MusicInfo: React.FC<MusicInfoProps> = (props) => {
  const [musicInfo, setMusicInfo] = useState<MusicInfoType>({
    name: '',
    picUrl: '',
    artist: ''
  }); // 歌曲信息

  const avatarRef = useRef<HTMLImageElement>(null);
  const upIconRef = useRef<HTMLDivElement>(null);
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // 获取歌曲详情
    getMusicDetail(selectState.playSoundId!).then((res: any) => {
      let info = res.songs[0].al;
      let ar = res.songs[0].ar[0];
      setMusicInfo({
        name: res.songs[0].name,
        picUrl: info.picUrl,
        artist: ar.name
      });
    });
  }, [selectState.playSoundId]);

  //  设置网站标题
  useTitle(musicInfo.name + '-' + musicInfo.artist + '-' + '网易云音乐');

  // 鼠标移入事件
  useEventListener(
    'mouseover',
    () => {
      avatarRef.current!.style.filter = `blur(1px) brightness(50%)`;
      upIconRef.current!.style.opacity = '1';
    },
    { target: upIconRef }
  );

  // 鼠标移出事件
  useEventListener(
    'mouseout',
    () => {
      avatarRef.current!.style.filter = 'none';
      upIconRef.current!.style.opacity = '0';
    },
    { target: upIconRef }
  );

  return (
    <>
      {/* 音乐详情页隐藏时--切换到图片和名字 */}
      {selectState.showMusicDetails === false && (
        <div className='min-w-min flex justify-start items-center text-gray-500'>
          {/* 图片 */}
          <div className='relative'>
            <img
              src={musicInfo.picUrl}
              alt=''
              className={styles.musicAvatarUrl}
              ref={avatarRef}
            />
            {/* 点击打开音乐详情页 */}
            <div
              className={styles.iconBox}
              ref={upIconRef}
              onClick={() => {
                dispatch({ type: 'setShowMusicDetails', payload: true });
              }}></div>
          </div>
          {/* 歌曲名字和歌手 */}
          <div className='ml-3 flex flex-col space-y-2'>
            <div className='flex items-center'>
              <div className={styles.musicTitle}>
                <p>{musicInfo.name}</p>
              </div>
              {/* <img className='ml-1 w-5' src={likeIcon} /> */}
            </div>
            <span className='text-sm'>{musicInfo.artist}</span>
          </div>
          <div>
            {/* <li data-tip='下载' className='tooltip'>
              <button className='btn btn-md btn-circle'>
                <Download theme='outline' size='20' fill='#000' />
              </button>
            </li> */}
          </div>
        </div>
      )}
      {/* 音乐详情页显示时--切换到图标 */}
      {selectState.showMusicDetails === true && (
        <div className='flex items-center'>
          {/* 向下的图标 */}
          <div className='w-32 flex items-center'>
            <Down
              className='cursor-pointer'
              theme='outline'
              size='30'
              fill='#5e5e5e'
              onClick={() => {
                dispatch({ type: 'setShowMusicDetails', payload: false });
              }}
            />
          </div>
          {/* 其它的图标列表---喜欢 */}

          <div>
            <button className='btn btn-md btn-circle'>
              <Like theme='outline' size='24' fill='#5e5e5e' />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicInfo;
