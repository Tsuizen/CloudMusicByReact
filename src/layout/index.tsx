import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PlayMusicBar from './PlayMusicBar';
import Main from '../layout/Main';
import SlideBar from './SlideBar';
import Loading from '~/components/Loading';
import TopBar from './TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { setShowDrawer } from '~/redux/slice';
import LyricBox from '~/pages/LyricBox';
import MusicDetails from '~/pages/MusicDetails';
import SideBar from './SlideBar';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <div className='h-screen flex flex-col justify-between z-50'>
      <TopBar />
      <Main>
        <SideBar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </Main>
      {/* 登录窗口 */}
      {/* <Login /> */}
      {/* 歌曲详情页 */}
      <MusicDetails />
      {/* 当前播放列表 */}
      {/* <PlayList></PlayList> */}
      {/* 音乐播放栏 */}
      <PlayMusicBar />
      {/* 歌词容器 */}
      <LyricBox></LyricBox>
    </div>
  );
};
export default Layout;
