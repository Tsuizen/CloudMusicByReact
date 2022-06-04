import { FunctionComponent } from 'react';

interface HelloProps {}

const Hello: FunctionComponent<HelloProps> = () => {
  console.log('hello');
  
  return <div>Hello world</div>;
};

export default Hello;
