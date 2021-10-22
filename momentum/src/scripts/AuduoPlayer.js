const audio = new Audio();
const prevSong = document.querySelector('#play-prev');
const play = document.querySelector('#play');
const nextSong = document.querySelector('#play-next');
const playList = document.querySelector('#play-list');
const btnVolume = document.querySelector('#volume');
const audioTime = document.querySelector('#audioTime');
const audioVolume = document.querySelector('#audioVolume');
const duration = document.querySelector('#duration');

let songNumber = 0;
let songQty = 0;
let playItems 
audio.volume = 0.5;

play.addEventListener('click', togglePlay)
audio.addEventListener('pause', pauseHandler)
nextSong.addEventListener('click', nextSongHandler)
prevSong.addEventListener('click', prevSongHandler)
playList.addEventListener('click', clickPlaylistHandler)

getPlayList()

async function getPlayList() {  
  const url = '../assets/Playlist.json';
  const res = await fetch(url);
  const songs = await res.json(); 
  createPlaylist(songs);
}

function createPlaylist(songs) {
  songQty = songs.length;
  songs.forEach(song => {
    let li = document.createElement('li')
    li.textContent = `${song.title} - ${song.duration}`
    li.dataset.src = song.src;
    li.classList.add('play-item')
    playList.append(li)
  });
  playItems = document.querySelectorAll('.play-item')
  playAudio(playItems[0])
  togglePlay()
}

function clickPlaylistHandler(e) {
  playAudio(e.target)
}

/**
 * Controls Audio player
 */
function togglePlay() {
  if (audio.paused) {
    audio.play()
    play.classList.add('pause')
  } else {
    audio.pause()
  }
}

function playAudio(element) {
    if (element.classList.contains('playing')) return
    playItems.forEach(item => item.classList.remove('playing'))
    element.classList.add('playing')
    audio.src = element.dataset.src;
    audio.currentTime = 0;
    updateAudioTime()
    togglePlay()
}

function pauseHandler() {
  play.classList.remove('pause')
}

function nextSongHandler() {
  songNumber++;
  songNumber = songNumber % songQty  ;
  playAudio(playItems[songNumber])
}

function prevSongHandler() {
  songNumber--;
  songNumber = (songNumber + songQty) % songQty ;
  playAudio(playItems[songNumber])
}


audioTime.addEventListener('input', changeTime)
audioVolume.addEventListener('input', changeVolume)

function changeTime(e) {
  let value = e.target.value;
  updateProgressBar(e.target, value)
  audio.currentTime = value * audio.duration / 100;
}

function updateProgressBar(element, value) { 
  element.value = value;
  element.style.background = `linear-gradient(to right, #ffffff8c 0%, #ffffffde ${value}%, #ffffff00 ${value}%, #ffffff00 100%)`
}

function changeVolume(e) {
  let value = e.target.value;
  updateProgressBar(e.target, value)
  audio.volume = value / 100;
  if (value < 1) {
    btnVolume.classList.add('mute')
  } else {
    btnVolume.classList.remove('mute')
  }
}

audio.addEventListener('timeupdate', updateAudioTime)

function updateAudioTime() {
  let value = Math.ceil(audio.currentTime / audio.duration * 100) || 0;
  updateProgressBar(audioTime,value )
  updateDurationNumber()
  if (audio.currentTime == audio.duration) nextSongHandler();
}

btnVolume.addEventListener('click', muteVolume)

function muteVolume() {
  if (audio.muted) {
    btnVolume.classList.remove('mute')
    audio.muted = false;
    updateProgressBar(audioVolume, audio.volume * 100)
  } else {
    btnVolume.classList.add('mute')
    audio.muted = true
    updateProgressBar(audioVolume, 0)
  }
}

function updateDurationNumber() {
  duration.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`
}

function formatTime(value) {
  let min = Math.floor(value / 60) || 0
  let sec = Math.floor(value % 60) || 0
  if (!min && !sec) return `0:0`
  else if (sec < 10) return `${min}:0${sec}`
  else return `${min}:${sec}`;
}