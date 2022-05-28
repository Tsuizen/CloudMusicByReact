import { FunctionComponent, useRef, memo } from 'react';
import { SongMenuType } from '@/types/index';
import { useHover } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { PlayOne, Play, User } from '@icon-park/react';

interface SongMenuProps {
  menuItem: SongMenuType;
}

const SongMenu: FunctionComponent<SongMenuProps> = (props) => {
  const coverRef = useRef<HTMLImageElement>(null!);
  const isHovering = useHover(coverRef); // 是否悬浮图片
  const navigate = useNavigate(); // 使用导航

  const handleClickMenuItem = (songeMenuId: number) => {
    navigate(`/songMenuDetails/${songeMenuId}/musicList`);
  };

  return (
    <>
      <li
        className='menu bg-base-100 w-56 p-2 rounded-box'
        onClick={() => handleClickMenuItem(props.menuItem.id)}>
        <div ref={coverRef} className='relative'>
          <img
            style={{ filter: 'brightness(75%)' }}
            src={
              props.menuItem.picUrl
                ? props.menuItem.picUrl
                : props.menuItem.coverImgUrl
            }
            className='h-50 object-cover rounded-md'
            onError={(e: any) => {
              e.target.onerror = null;
              // e.target.src = testImg;
            }}
            alt=''
          />
          {/* 显示播放按钮 */}
          <Play
            className={`absolute right-2 bottom2 transition ease-in-out duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            theme='outline'
            size='33'
            fill='#ffffff'
          />
          {/* 创建者 */}
          <div
            style={{ display: props.menuItem.creator ? 'flex' : 'none' }}
            className='absolute flex justify-start items-center bottom-2 left-2'>
            <User theme='outline' size='15' fill='#ffffff' />
            <span className='text-xs ml-1'>
              {props.menuItem.creator?.nickname}
            </span>
          </div>
          {/* 歌单名称 */}
          <span
            style={{
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            className='text-sm text-gray-300 h-11 py-1 hover:text-white'>
            {props.menuItem.name}
          </span>
          {/* 播放量 */}
          <div className='flex items-center absolute right-1 top-1'>
            <PlayOne theme='outline' size='18' fill='#ffffff' />
            <span className='text-xs'>{props.menuItem.playCount}</span>
          </div>
        </div>
      </li>
    </>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
  if (prevProps === nextProps) {
    return true;
  } else {
    return false;
  }
}

export default memo(SongMenu, areEqual);
