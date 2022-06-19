import { FunctionComponent } from 'react';
import PlayMusicBar from './PlayMusicBar';
import Main from '../layout/Main';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className='h-screen flex flex-col justify-bewteen z-50'>
      <Main></Main>
      <PlayMusicBar />
      
    </div>
  );
};
export default Layout;
