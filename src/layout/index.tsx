import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PlayMusicBar from './PlayMusicBar';
import Main from '../layout/Main';
import SlideBar from './SlideBar';
import Loading from '~/components/Loading';
import TopBar from './TopBar';
import Drawer from './TopBar/components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { setShowDrawer } from '~/redux/slice';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <div className='h-screen flex flex-col justify-bewteen z-50'>
      <TopBar />
      <Main>
        <SlideBar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </Main>
      <PlayMusicBar />
      <Drawer
        isShow={selectState.showDrawer}
        setShowDrawer={(value) => {
          dispatch({ type: setShowDrawer, payload: value });
        }}></Drawer>
    </div>
  );
};
export default Layout;
