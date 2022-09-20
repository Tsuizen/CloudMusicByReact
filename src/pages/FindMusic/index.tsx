import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

interface FindMusicProps {}

const FindMusic: React.FC<FindMusicProps> = () => {
  const [topBarMenu, setTopNavBar] = useState<string[]>([
    '个性推荐',
    '歌单',
    '排行榜',
    '歌手',
    '最新音乐'
  ]); // 顶部栏菜单
  const [activeMenu, setActiveMenu] = useState<
    '个性推荐' | '歌单' | '排行榜' | '歌手' | '最新音乐'
  >('个性推荐'); // 当前活动菜单

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/findMusic/recommend':
        setActiveMenu('个性推荐');
        break;
      case '/findMusic/songMenuList':
        setActiveMenu('歌单');
        break;
      case '/findMusic/rankingList':
        setActiveMenu('排行榜');
        break;
    }
  }, []);

  /**
   * 点击每个活动菜单
   */
  const handleActiveMenu = (name: string) => {
    switch (name) {
      case '个性推荐':
        setActiveMenu(name);
        navigate('/findMusic'); // 首页
        break;
      case '歌单':
        setActiveMenu(name);
        navigate('/findMusic/songMenuList');
        break;
      case '排行榜':
        setActiveMenu(name);
        navigate('/findMusic/rankingList');
        break;
      case '歌手':
        setActiveMenu(name);
        navigate('/findMusic/singerList');
        break;
      case '最新音乐':
        setActiveMenu(name);
        navigate('/findMusic/newSongList');
        break;
    }
  };
  return (
    <>
      {/* 顶部 */}
      <ul className=' px-3 w-full bg-base-100 menu menu-horizontal '>
        {topBarMenu.map((item) => {
          return (
            <li
              key={item}
              onClick={() => {
                handleActiveMenu(item);
              }}
              className={` ${
                activeMenu === item
                  ? 'bordered  text-xl font-bold'
                  : 'text-gray-400'
              }`}>
              <a>{item}</a>
            </li>
          );
        })}
      </ul>
      {/* 内容 */}
      <Outlet></Outlet>
    </>
  );
};

export default FindMusic;
