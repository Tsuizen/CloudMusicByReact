import React, { useMemo, useState } from 'react';
import { Howl } from 'howler';

interface MusicControlProps {}

const MusicControl = () => {
  const [musicUrl, setMusicUrl] = useState<string>('');

  const sound = useMemo(
    () =>
      new Howl({
        src: [musicUrl],
        format: ['.webm', '.mp3', '.wav'],
        html5: true,
        xhr: {
          method: 'get'
        },
        autoplay: false,
        preload: 'metadata',
        onload: () => {

        },
        onend: () => {
          
        }
      }),
    [musicUrl]
  );

  return <div>MusicControl</div>;
};

export default MusicControl;
