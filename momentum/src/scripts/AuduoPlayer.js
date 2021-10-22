const audio = new Audio();
const prevSong = document.querySelector('#play-prev');
const play = document.querySelector('#play');
const nextSong = document.querySelector('#play-next');
const playList = document.querySelector('#play-list');
const btnVolume = document.querySelector('#volume');

let songNumber = 0;
let songQty = 0;
let playItems 

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
 * 
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

const audioTime = document.querySelector('#audioTime');
const audioVolume = document.querySelector('#audioVolume');
  
audioTime.addEventListener('input', audioRange)
audioVolume.addEventListener('input', audioRange)


function audioRange() {
  this.style.background = `linear-gradient(to right, #ffffff8c 0%, #ffffffde ${this.value}%, #ffffff00 ${this.value}%, #ffffff00 100%)`
}

audioTime.addEventListener('input', changeTime)
audioVolume.addEventListener('input', changeVolume)

function changeTime() {
  audio.currentTime = this.value * audio.duration / 100;
}

function changeVolume() {
  audio.volume = this.value / 100;
}

audio.addEventListener('timeupdate', updateAudioTime)

function updateAudioTime() {
  audioTime.value = audio.currentTime;
  audioRange.call(audioTime)
}

btnVolume.addEventListener('click', muteVolume)

function muteVolume() {
  if (audio.muted) {
    btnVolume.classList.remove('mute')
    audio.muted = false
  } else {
    btnVolume.classList.add('mute')
    audio.volume = 0;
    audioRange.call(audioVolume)
    audio.muted = true
  }
}