import { FunctionComponent } from 'react';

interface Props {}

const Main: React.FC<Props> = (props) => {
  return (
    <div className='flex-1 flex justify-between relative overflow-hidder'>
      {props.children}
    </div>
  );
};

export default Main;
