import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cellphoneLogin } from '~/services/api/user';
import { setUserLogin } from '~/redux/slice';
import useToast from '~/components/Toast';

interface LoginBoxProps {
  show: boolean;
  loginBoxRef: any;
  setShowLoginBox: (value: boolean) => void;
}

const LoginBox: React.FC<LoginBoxProps> = (props) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const result: any = await cellphoneLogin({
      phone,
      password
    });
    if (result.code === 200) {
      dispatch({
        type: setUserLogin,
        payload: result
      });
      props.setShowLoginBox(false);
    } else {
      useToast({
        type: 'error',
        message: '账户密码错误'
      })
    }
  };

  return (
    <div
      ref={props.loginBoxRef}
      style={{ visibility: props.show ? 'visible' : 'hidden' }}
      className='flex flex-col bg-gray-100 rounded-md absolute top-10 z-50 px-10 py-5'>
      <div className='m-3 p-l-1'>
        <input
          id='telNo'
          type='tel'
          placeholder='请输入手机号'
          className='input w-full max-w-xs'
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='m-3'>
        <input
          id='password'
          type='password'
          placeholder='请输入密码'
          className='input w-full max-w-xs'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='w-full bg-red-500 rounded-lg text-white'
        onClick={handleLogin}>
        登录
      </button>
    </div>
  );
};

export default LoginBox;
