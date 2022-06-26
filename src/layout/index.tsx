import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PlayMusicBar from './PlayMusicBar';
import Main from '../layout/Main';
import SlideBar from './SlideBar';
import Loading from '~/components/Loading';
import TopBar from './TopBar';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
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
    </div>
  );
};
export default Layout;
