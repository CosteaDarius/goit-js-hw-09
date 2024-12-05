import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const saveCurrentTime = throttle(data => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', saveCurrentTime);

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Error setting current time:', error.name);
  });
}
