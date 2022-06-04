import { lazy } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import Loading from '../components/Loading';

import Layout from '../layout/index';
import Hello from '../pages/Hello';

// const Login = lazy(() => import('@/pages/Login'));
const FindMusic = lazy(() => import('../pages/FindMusic'));

export const Router = () => {
  if (window.location.pathname === '/') {
    // window.location.pathname = '/findMusic';
  }
  return (
    <BrowserRouter basename='/'>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  // 路由表
  const routes: RouteObject[] = [
    {
      path: '/',

      element: <Layout />,
      children: [
        {
          path: '/',
          element: <FindMusic />,
          children: [{}]
        },
        {
          path: '/hello',
          element: <Hello />
        }
      ]
    },
    {
      path: '*',
      element: <Loading />
    }
  ];

  const element = useRoutes(routes);
  return element;
};
