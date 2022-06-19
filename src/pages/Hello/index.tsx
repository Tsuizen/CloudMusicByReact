import { FunctionComponent } from 'react';

interface HelloProps {}

const Hello: React.FC<HelloProps> = (props) => {
  console.log('hello');
  
  return <div>Hello world</div>;
};

export default Hello;
