// youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('body')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = {};

function onYouTubeIframeAPIReady(id) {
    player[id] = new YT.Player(`_${id}`, {
    videoId: `${id}`,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    stopVideo(event.target)
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function stopVideo(current = null) {
  for (let key in player) {
    if ( player[key] != current) player[key].stopVideo();
  }
}

const iframeContainers = document.querySelectorAll('.iframe-slide');
addListeners(iframeContainers);

function addListeners() {
  iframeContainers.forEach( frame => {
    frame.addEventListener('click', iframeClickHandler)
  })
}

function iframeClickHandler(e) {
  e.preventDefault();
  let id = e.currentTarget.id.slice(1)
  onYouTubeIframeAPIReady(id);
}

export {stopVideo};

/*
function getVideoId(element) {
  let regexp = /https:\/\/youtu.be\/([a-zA-Z0-9_-]+)$/i;
  let link = element.querySelector('.iframe-slide_link').getAttribute('href');
  let id = link.match(regexp)[1];
  return id;
}

function createIframe(parentElement, id) {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  //iframe.setAttribute('style', 'border: 0 ;width: 100%; height: 100%');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${id}?autoplay=1`);
  iframe.classList.add('iframe-slide');
  iframe.setAttribute('id', '12345')
  parentElement.append(iframe);

}
*/

