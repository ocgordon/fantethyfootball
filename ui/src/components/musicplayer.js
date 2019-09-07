import React, { useState, useEffect } from 'react';

const MusicPlayer = url => {
  // const [playing] = useState(false);
  console.log('music player render');
  useEffect(() => {
    const audio = new Audio('song.mp3');
    console.log('use effect');
    try {
      audio.play();
    } catch (err) {
      console.error('audio error', err);
    }
  }, []);

  return [null];
};

export default MusicPlayer;
