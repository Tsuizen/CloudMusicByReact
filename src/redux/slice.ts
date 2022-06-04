import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface stateType {
  showLoginBox?: boolean, // 显示登录盒子
  showPlayList?: boolean, // 显示当前播放列表
  showDrawer: boolean, // 显示当前的用户信息抽屉
  showMusicDetails?: boolean, // 显示当前音乐的详情页
  showSearchWindow?: boolean, // 显示搜索窗口
  showLyric?: boolean, // 显示歌词
  playSoundId: number, // 当前播放的音乐id
  autoPlay: boolean, // 是否自动播放音乐
  currentVolume: number, // 当前音量
  currentLyric: string, // 当前歌词
  searchWords: string // 当前搜索关键词
}

/**
 * 全局状态
 */
 const initialState: stateType = {
  showLoginBox: false,
  showPlayList: false,
  showDrawer: false,
  showMusicDetails: false,
  showSearchWindow: false,
  showLyric: false,
  playSoundId: 1815341568,
  autoPlay: false,
  currentVolume: 70,
  currentLyric: '歌词',
  searchWords: ''
 };

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setShowLoginBox: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showLoginBox: action.payload
      }
    },
    setShowPlayList: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showPlayList: action.payload
      }
    },
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showDrawer: action.payload
      }
    },
    setShowMusicDetails: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showMusicDetails: action.payload
      }
    },
    setShowSearchWindow: (state, action: PayloadAction<boolean>) => { 
      return {
        ...state,
        showSearchWindow: action.payload
      }
    },
    setShowLyric: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showLyric: action.payload
      }
    },
    setPlaySoundId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        playSoundId: action.payload
      }
    },
    setAutoPlay: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        autoPlay: action.payload
      }
    },
    setCurrentVolume: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentVolume: action.payload
      }
    },
    setCurrentLyric: (state, action: PayloadAction<string>) => { 
      return {
        ...state,
        currentLyric: action.payload
      }
    },
    setSearchWords: (state, action: PayloadAction<string>) => { 
      return {
        ...state,
        searchWords: action.payload
      }
    },
  }
})

export const { setShowLoginBox, setShowPlayList, setShowDrawer, setShowMusicDetails,
              setShowSearchWindow, setShowLyric, setPlaySoundId, setAutoPlay,
              setCurrentVolume, setCurrentLyric, setSearchWords } = slice.actions;

export default slice.reducer;