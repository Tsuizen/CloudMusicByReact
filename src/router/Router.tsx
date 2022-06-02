import { lazy } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import Loading from '../components/Loading';

import Layout from '../layout/index';
import Hello from '../pages/Hello';

// const Login = lazy(() => import('@/pages/Login'));
const FindMusic = lazy(() => import('../pages/FindMusic'));

export const Router = () => {
  if (window.location.pathname === '/') {
    window.location.pathname = '/app/findMusic';
  }
  return (
    <BrowserRouter basename='/app'>
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
          element: <FindMusic />
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
