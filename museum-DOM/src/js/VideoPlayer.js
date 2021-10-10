const video = document.querySelector('.video-player');
const frame = document.querySelector('.video-wrapper');
const wrapperPlayIcon = document.querySelector('.video-wrapper__play-icon');
const videoTimeBar = document.querySelector('.tool-bar__time-bar');
const volumeBar = document.querySelector('.tool-bar__volume-bar');
const volumeBtn = document.querySelector('.tool-bar__volume');
const playBtn = document.querySelector('.tool-bar__play');
const speedRateIndicator = document.querySelector('.speed-rate');
const playlistModal = document.querySelector('.video-player__playlist');
playlistModal.style.visibility = 'hidden';

const qtyOfVideo = 5;
let isMute = false;
let currentVideo = 0;
let isOnScreen = false;

/* Add posters to playlist  */
for (let i = qtyOfVideo-1; i >= 0; i--) {
 let posterSrc = `assets/video/poster${i}.jpg`
 let posterName = `Video ${i}`
 poster(playlistModal, "playlist__poster", posterSrc, posterName, i, 0);
}

/*Add preview DIV for slide video*/
/*
poster(frame,'video-wrapper__video-preview', ' ');
const preview = document.querySelector('.video-wrapper__video-preview');
const previewImg = document.querySelector('.video-wrapper__video-preview img')
*/
updateVolumeBar(volumeBar.value);
updateTimeProgressBar();



/* Click on video player handlers*/
frame.addEventListener('click', clickHandler);
function clickHandler(e) {
/*Play/pause by click on video*/
  if (e.target.classList.contains('video-player')||
      e.target.classList.contains('tool-bar__play')||
      e.target.classList.contains('video-wrapper__play-icon')) {
      togglePlayPause();
  }
/*Click on mute button*/
  if (e.target.classList.contains('tool-bar__volume')) {
    mute();
  }
/* Click on fullscreen button */
  if (e.target.classList.contains('tool-bar__full-screen')) {
    toggleFullscreen(frame);
  }
/*Click on previous video button */
  if (e.target.classList.contains('tool-bar__previous')) {
    previousVideo();
  }
/*Click on next video button */
  if (e.target.classList.contains('tool-bar__next')) {
    nextVideo();
  }
/*Open close playlist modal window */
  if (e.target.classList.contains('button_playlist')) {
    togglePlaylist();
  }
  if (e.target.classList.contains('playlist__close-button')) {
    togglePlaylist();
  }
}

/* Playlist handler*/
playlistModal.addEventListener('click', playFromPlaylist);
function playFromPlaylist(e) {
  for (let i=0; i < e.path.length; i++) {
    if (e.path[i].nodeName == 'DIV' && e.path[i].classList.contains('playlist__poster')) {
      currentVideo = e.path[i].dataset.numberOfVideo;
//      e.path[i].lastElementChild.textContent = `Wtched: ${video.time} sec`;
      togglePlaylist();
      switchVideo(currentVideo);
      break;
    }
  }
}

function mute() {
  if (isMute) {
    isMute = false;
    volumeBar.value = volumeBar.dataset.dataVolume;
    updateVolumeBar(volumeBar.value);
  } else {
    isMute = true;
    volumeBar.dataset.dataVolume = volumeBar.value;
    updateVolumeBar(0);
  }
}
/* Actions when pause appears*/
video.addEventListener('pause', videoPauseHandler);
function videoPauseHandler() {
  video.pause();
  wrapperPlayIcon.style.visibility = 'visible';
  playBtn.classList.remove('tool-bar__pause');
  let currentPoster = playlistModal.querySelector(`[data-number-of-video="${currentVideo}"]`);
  if (video.currentTime > 0) {
    currentPoster.lastElementChild.textContent = `Watched: ${Math.floor(video.currentTime)} sec`;
  }
}

function togglePlayPause() {
  if (video.paused) {
    wrapperPlayIcon.style.visibility  = 'hidden';
    playBtn.classList.add('tool-bar__pause')
    video.play();
  } else {
    videoPauseHandler();
  }
}

/*Progress bars for video player  */
video.addEventListener('timeupdate', updateTimeProgressBar);
function updateTimeProgressBar() {
  let value = Math.ceil(video.currentTime / video.duration * 100) || 0;
  updateProgressBar(videoTimeBar, value);
 }

/* Change progress bars*/
frame.addEventListener('input', function(e) {
  const value = e.target.value;
  updateProgressBar(e.target, value);
  if (e.target.classList.contains('tool-bar__time-bar')) {
   video.currentTime = value * video.duration / 100;
  }
  if (e.target.classList.contains('tool-bar__volume-bar')) {
   updateVolumeBar(value);
   }
})
function updateProgressBar(element, value) {
  element.value = value;
  element.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`;
}
function updateVolumeBar(value) {
  video.volume = value / 100;
  updateProgressBar(volumeBar, value);
  if (value < 50) {volumeBtn.classList.add('tool-bar__volume_half'); volumeBtn.classList.remove('tool-bar__volume_zero','tool-bar__mute')};
  if (value <= 20) {volumeBtn.classList.add('tool-bar__volume_zero'); volumeBtn.classList.remove('tool-bar__mute')};
  if (value == 0) {volumeBtn.classList.add('tool-bar__mute')};
  if (value >= 50) {volumeBtn.classList.remove('tool-bar__volume_half','tool-bar__volume_zero', 'tool-bar__mute')};
}

/* Fullscreen */
function toggleFullscreen(elem) {
  const fullScreenBtn = document.querySelector('.tool-bar__full-screen');
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
    fullScreenBtn.classList.add('tool-bar__full-screen_exit')
  } else {
    document.exitFullscreen();
    fullScreenBtn.classList.remove('tool-bar__full-screen_exit')
  }
}
/* Next video */
function nextVideo() {
  videoPauseHandler();
  currentVideo++;
  if (currentVideo >= qtyOfVideo) {currentVideo = 0};
  slideVideo(currentVideo, 'shift-right');
}
/* Previous video */
function previousVideo() {
  videoPauseHandler();
  currentVideo--;
  if (currentVideo < 0) {currentVideo = 4};
  slideVideo(currentVideo, 'shift-left' );
}
/*
function slideVideo(n, shiftClass) {
  document.removeEventListener('keydown', keyDownHandler);
  frame.removeEventListener('click', clickHandler);
  previewImg.src = `assets/video/poster${n}.jpg`;
  preview.classList.add(shiftClass);
  video.classList.add(shiftClass);
}
preview.addEventListener('animationend', slideEnded);

function slideEnded () {
  preview.classList.remove('shift-right', 'shift-left');
  video.classList.remove('shift-right', 'shift-left');
  switchVideo(currentVideo);
  document.addEventListener('keydown', keyDownHandler);
  frame.addEventListener('click', clickHandler);
}
*/
/* Switch to video with number n from video catalog */
function switchVideo(n=0) {
  console.log('switchVideo param=', n)
    video.src = `assets/video/video${n}.mp4`;
    video.poster = `assets/video/poster${n}.jpg`;
    if (speedRateIndicator.style.visibility == 'visible') {
      showSpeedIndicator(video.playbackRate);
    }
}
/* Hot keys */
document.addEventListener('keydown', keyDownHandler);
function keyDownHandler(e) {
  if (!isOnScreen) return
  e.preventDefault();
  switch (e.code) {
    case 'Space':
      togglePlayPause();
      break;
    case 'KeyK':
      togglePlayPause();
      break;
    case 'KeyM':
      mute();
      break;
    case 'KeyF':
      toggleFullscreen(frame) ;
      break;
    case 'Period':
      if (e.shiftKey) speedVideoUp();
      break;
    case 'Comma':
      if (e.shiftKey) speedVideoDown();
      break;
    case 'KeyJ':
      stepVideoTimeTo(-10);
      break;
    case 'KeyL':
      stepVideoTimeTo(10);
      break;
    case 'KeyP':
    if (e.shiftKey) previousVideo();
      break;
    case 'KeyN':
    if (e.shiftKey) nextVideo();
      break;
    default :
      if (e.code.match(/(Digit[0-9])|(Numpad[0-9])/)) {
        setVideoTime(e.code.slice(-1)*10);
      }
      break;
  }
}
function speedVideoUp() {
  video.playbackRate += 0.25;
  if (video.playbackRate >= 2.5) {video.playbackRate = 2.5}
  showSpeedIndicator(video.playbackRate);
}
function speedVideoDown() {
  video.playbackRate -= 0.25;
  if (video.playbackRate <= 0.25) {video.playbackRate = 0.25}
  showSpeedIndicator(video.playbackRate);
}
function showSpeedIndicator (speedRate) {
    speedRateIndicator.textContent = ` ${video.playbackRate}x `
    speedRateIndicator.style.visibility = 'visible';
    if (speedRate == 1) {
      setTimeout(()=>speedRateIndicator.style.visibility = 'hidden', 2000);
  }
}
function stepVideoTimeTo (time) {
  if (video.currentTime + time <= 0) {video.currentTime = 0;}
  else if (video.currentTime + time >= video.duration) {video.currentTime = video.duration;}
  else {video.currentTime += time;}
}

function setVideoTime (percent) {
  if (percent >= 0 && percent <= 100) {
    video.currentTime = video.duration / 100 * percent;2
  }
}

function togglePlaylist() {
  videoPauseHandler();
  if (playlistModal.style.visibility == 'hidden') {
    playlistModal.style.visibility = 'visible';
  } else {playlistModal.style.visibility = 'hidden'; }
}

function  poster(parentElement,posterClass ,posterSrc ,posterName, linkedVideo, watchedTime) {
  let poster = document.createElement('div');

  if (linkedVideo != undefined) {poster.dataset.numberOfVideo = linkedVideo;}
  if (posterSrc != undefined) {
    poster.insertAdjacentHTML('beforeend',`<img src="${posterSrc}">`)
  }
  if (posterName != undefined) {
    poster.insertAdjacentHTML('beforeend',`<p>Name: ${posterName}</p>`);
  }
  if (watchedTime != undefined) {
    poster.insertAdjacentHTML('beforeend',`<p>Unwatched</p>`);
  }
  poster.classList.add(posterClass);
  parentElement.prepend(poster);
}

const observer = new IntersectionObserver( entries => {
  console.log('in=',isOnScreen )
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
       isOnScreen = true;
    } else {
      isOnScreen = false;
      videoPauseHandler();
    }
     console.log('isOnScreen=',isOnScreen )
   });
 });

 console.log('out=',isOnScreen )
 observer.observe(frame);

export {switchVideo, videoPauseHandler};
