import {
  Performance,
  EveryUser,
  Video,
  Fm,
  History,
  MusicMenu
} from '@icon-park/react';
import { MenuType } from '~/types';

const menuList: MenuType[] = [
  {
    title: '发现音乐',
    key: 'find_misic',
    url: 'findMusic',
    icon: Performance
  },
  {
    title: '私人FM',
    key: 'fm',
    url: 'fm',
    icon: Fm
  },
  {
    title: '视频',
    key: 'video',
    url: 'video',
    icon: Video
  },
  {
    title: '关注',
    key: 'fellow',
    url: 'fellow',
    icon: EveryUser
  },
]

const myMusic: MenuType[] = [
  {
    title: '最近播放',
    key: 'recent_play',
    url: 'recentPlay',
    icon: History
  }
]

const songList: MenuType[] = [
  {
    title: '我喜欢的音乐',
    key: 'favorite_music',
    url: 'favoriteMusic',
    icon: MusicMenu
 }
]

export { menuList, myMusic, songList }
