import React from 'react';
import MusicControl from './components/MusicControl';
import styles from './index.module.css';

type PlayMusicBarProps = {};

const PlayMusicBar = (props: PlayMusicBarProps) => {
  return (
    <div className={styles.container}>
      <MusicControl />
    </div>
  );
};

export default PlayMusicBar;
