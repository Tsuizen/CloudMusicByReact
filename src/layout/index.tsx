import { FunctionComponent } from 'react';
import Main from '../layout/Main';

interface Props {}

const Layout: FunctionComponent<Props> = () => {
  return (
    <div className='h-screen flex flex-col justify-bewteen z-50'>
      <Main></Main>
    </div>
  );
};
export default Layout;
