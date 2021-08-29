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


/* Add posters to playlist  */ 
for (let i = qtyOfVideo-1; i >= 0; i--) {
 let posterSrc = `assets/video/poster${i}.jpg`
 let posterName = `Video ${i}`
 poster(playlistModal, "playlist__poster", posterSrc, posterName, i)
}
/*Add preview DIV for slide video*/
poster(frame,'video-wrapper__video-preview', ' ');
const preview = document.querySelector('.video-wrapper__video-preview');
const previewImg = document.querySelector('.video-wrapper__video-preview img')

updateVolumeBar(volumeBar.value);
updateTimeProgressBar();

playlistModal.addEventListener('click', playFromPlaylist);
function playFromPlaylist(e) {
  console.log('e.path=', e.path);
  for (let i=0; i < e.path.length; i++) {
    if (e.path[i].nodeName == 'DIV' && e.path[i].classList.contains('playlist__poster')) {
      currentVideo = e.path[i].dataset.numberOfVideo;
      console.log('currentVideo=', currentVideo);
      togglePlaylist();
      switchVideo(currentVideo);
      break;
    }
  }
}


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
function pauseHandler() {
  wrapperPlayIcon.style.visibility = 'visible';
  playBtn.classList.remove('tool-bar__pause');
}

/* Actions when pause appears*/
video.addEventListener('pause', pauseHandler);
function togglePlayPause() {
  if (video.paused) {
    wrapperPlayIcon.style.visibility  = 'hidden';
    playBtn.classList.add('tool-bar__pause')
    video.play();
  } else {
    video.pause();
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
  element.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}
function updateVolumeBar(value) { 
  video.volume = value / 100;
  updateProgressBar(volumeBar, value);
  if (value < 50) {volumeBtn.classList.add('tool-bar__volume_half'), volumeBtn.classList.remove('tool-bar__volume_zero')};
  if (value <= 10) {volumeBtn.classList.add('tool-bar__volume_zero')};
  if (value >= 50) {volumeBtn.classList.remove('tool-bar__volume_half','tool-bar__volume_zero')};
}

/* Fullscreen */
function toggleFullscreen(elem) {
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
/* Next video */
function nextVideo() {
  console.log(video.width);
  currentVideo++;
  if (currentVideo >= qtyOfVideo) {currentVideo = 0};
  slideVideo(currentVideo, 'shift-right'); 
  
}
/* Previous video */
function previousVideo() {
  currentVideo--;
  if (currentVideo < 0) {currentVideo = 4};
  slideVideo(currentVideo, 'shift-left' );
}

function slideVideo(n, shiftClass) {
  video.pause();
  
  previewImg.src = `assets/video/poster${n}.jpg`;
  preview.classList.add(shiftClass);
  video.classList.add(shiftClass);
}
preview.addEventListener('animationend', slideEnded);

function slideEnded () {
  console.log('animationend');
  preview.classList.remove('shift-right', 'shift-left');
  video.classList.remove('shift-right', 'shift-left');
  switchVideo(currentVideo);
} 

/* Switch to video with number n from video catalog */
function switchVideo(n=0) {
    video.src = `assets/video/video${n}.mp4`
    video.poster = `assets/video/poster${n}.jpg`
}
/* Hot keys */
document.addEventListener('keydown', keyDownHandler); 
function keyDownHandler(e) {
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
      toggleFullscreen(frame);
      break;
    case 'Period': 
      speedVideoUp();
      break;
    case 'Comma': 
      speedVideoDown();
      break;
    case 'KeyJ': 
      stepVideoTimeTo(10);
      break;  
    case 'KeyL': 
      stepVideoTimeTo(-10);
      break; 
    case 'KeyP': 
      previousVideo();
      break; 
    case 'KeyN': 
      nextVideo();
      break;
    default :
      if (e.code.match(/(Digit[0-9])|(Numpad[0-9])/)) {
        console.log(e.code.slice(-1));
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
  video.pause();
  if (playlistModal.style.visibility == 'hidden') {
    playlistModal.style.visibility = 'visible';
  } else {playlistModal.style.visibility = 'hidden'; }
}

function  poster(parentElement,posterClass ,posterSrc ,posterName, linkedVideo) {
  let poster = document.createElement('div');
  
  if (linkedVideo != undefined) {poster.dataset.numberOfVideo = linkedVideo;}
  if (posterSrc != undefined) { 
    poster.insertAdjacentHTML('beforeend',`<img src="${posterSrc}">`)
  }
  if (posterName != undefined) {
    poster.insertAdjacentHTML('beforeend',`<p>Name: ${posterName}</p>`);
  }
  poster.classList.add(posterClass);
  parentElement.prepend(poster);
}