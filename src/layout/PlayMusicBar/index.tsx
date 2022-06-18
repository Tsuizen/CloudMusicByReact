import React from 'react';
import MusicControl from './components/MusicControl';
import MusicInfo from './components/MusicInfo';
import styles from './index.module.css';

interface PlayMusicBarProps {}

const PlayMusicBar: React.FC<PlayMusicBarProps> = (props) => {
  return (
    <div className={styles.container}>
      <MusicInfo />
      <MusicControl />
    </div>
  );
};

export default PlayMusicBar;
