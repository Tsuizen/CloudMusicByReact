import { lazy } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import Loading from '../components/Loading';
import SongMenuList from '~/pages/SongMenuList';
import Layout from '../layout/index';
import Hello from '../pages/Hello';

// const Login = lazy(() => import('@/pages/Login'));
const FindMusic = lazy(() => import('~/pages/FindMusic'));
const NewSongList = lazy(() => import('~/pages/NewSongList'));
const RankingList = lazy(() => import('~/pages/RankingList'));
const Recommend = lazy(() => import('~/pages/Recommend'));
const SingerList = lazy(() => import('~/pages/SingerList'));

const Video = lazy(() => import('~/pages/Video'));
const FM = lazy(() => import('~/pages/FM'));
const Fellow = lazy(() => import('~/pages/Fellow'));

export const Router = () => {
  if (window.location.pathname === '/') {
    window.location.pathname = '/findMusic/';
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
          path: '/findMusic',
          element: <FindMusic />,
          children: [
            {
              path: '',
              element: <Recommend />
            },
            {
              path: 'songMenuList',
              element: <SongMenuList />
            },
            {
              path: 'rankingList',
              element: <RankingList />
            },
            {
              path: 'singerList',
              element: <SingerList />
            },
            {
              path: 'newSongList',
              element: <NewSongList />
            }
          ]
        },
        {
          path: '/fm',
          element: <FM />
        },
        {
          path: '/video',
          element: <Video />
        },
        {
          path: '/fellow',
          element: <Fellow />
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
