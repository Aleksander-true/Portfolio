const video = document.querySelector('.video-player');
const frame = document.querySelector('.video-wrapper');
const wrapperPlayIcon = document.querySelector('.video-wrapper__play-icon');
const videoTimeBar = document.querySelector('.tool-bar__time-bar');
const volumeBar = document.querySelector('.tool-bar__volume-bar');
const volumeBtn = document.querySelector('.tool-bar__volume');
const playBtn = document.querySelector('.tool-bar__play');
const speedRateIndicator = document.querySelector('.speed-rate');

let isMute = false;
let currentVideo = 0;

frame.addEventListener('click', clickHandler);
video.addEventListener('pause', pauseHandler);

updateVolumeBar(volumeBar.value);
updateTimeProgressBar();

function clickHandler(e) {

  if (e.target.classList.contains('video-player')||
      e.target.classList.contains('tool-bar__play')||
      e.target.classList.contains('video-wrapper__play-icon')) {
      togglePlayPause();
  }

  if (e.target.classList.contains('tool-bar__volume')) {
    mute();
  }

  if (e.target.classList.contains('tool-bar__full-screen')) {
    toggleFullscreen(frame);
  }

  if (e.target.classList.contains('tool-bar__previous')) {
    previousVideo();
  }
  if (e.target.classList.contains('tool-bar__next')) {
    nextVideo();
  }

}

function togglePlayPause() {
  if (video.paused) {
    wrapperPlayIcon.style.visibility  = 'hidden';
    playBtn.classList.add('tool-bar__pause')
    video.play();
  }
  else {
    video.pause();
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

 /*Progress bars for video player  */
 video.addEventListener('timeupdate', updateTimeProgressBar);

 function updateTimeProgressBar() {
   let value = Math.ceil(video.currentTime / video.duration * 100) || 0;
   updateProgressBar(videoTimeBar, value);
 }

 frame.addEventListener('input', function(event) {
   const value = event.target.value;
   updateProgressBar(event.target, value);
   if (event.target.classList.contains('tool-bar__time-bar')) {
    video.currentTime = value * video.duration / 100;
   }
   if (event.target.classList.contains('tool-bar__volume-bar')) {
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

  function toggleFullscreen(elem) {
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function nextVideo() {
    currentVideo++;
    if (currentVideo >= 5) {currentVideo = 0};
    switchVideo(currentVideo);
  }

  function previousVideo() {
    currentVideo--;
    if (currentVideo < 0) {currentVideo = 4};
    switchVideo(currentVideo);
  }

  function switchVideo(n) {
    if (video.paused) {
      video.src = `assets/video/video${n}.mp4`
      video.poster = `assets/video/poster${n}.jpg`
    } else {
      video.src = `assets/video/video${n}.mp4`
      video.poster = `assets/video/poster${n}.jpg`
      video.play();
    }
  }

  document.addEventListener('keydown', keyDownHandler); 

  function keyDownHandler(e) {
    switch (e.code) {
      case 'Space': 
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
    speedRateIndicator.textContent = `${video.playbackRate}x`
    speedRateIndicator.style.visibility = 'visible';
    if (speedRate == 1) {
      setTimeout(()=>speedRateIndicator.style.visibility = 'hidden', 2000);
    }
  }
