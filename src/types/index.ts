import { Icon } from "@icon-park/react/lib/runtime";

// 歌曲类型
interface SongType {
  id: number; // 歌曲唯一标识
  name: string; // 歌曲名
  artist?: string; // 艺术家
  artists: ArtistType[]; // 歌手列表
}

// 歌手类型
interface ArtistType {
  id: number; // 歌手id
  name: string; // 歌手名字
  img1v1Url: string; // 歌手头像
}

// 专辑类型
interface Albums {
  id: number; // 专辑id
  name: string; // 专辑名字
  artist: ArtistType; // 专辑歌手
}

// 搜索推荐
interface SearchSuggestType {
  songs: SongType[]; // 歌曲列表
  artists: ArtistType[]; // 歌手列表
  albums: Albums[]; // 专辑列表
}

// 歌单类型
interface SongMenuType {
  id: number;
  picUrl?: string; // 歌单封面
  coverImgUrl?: string; // 歌单封面
  name: string; // 歌单名称
  playCount: number; // 播放数量
  creator?: {
    userId: number; // 创建者id
    nickname: string; // 创建者昵称
    avatarUrl: string; // 创建者头像
  };
}

interface MenuType {
  title: string;
  key: string;
  url: string;
  icon: Icon;
}

interface UserType {
  account: {
    id: number;
    token: string;
  };
  profile: {
    nickname: string;
    avatarUrl: string;
  }
}

export type { SongType, SearchSuggestType, SongMenuType, MenuType, UserType };
