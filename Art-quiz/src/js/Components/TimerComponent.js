const TimerComponent = {
  render: (seconds,total) => {
  const percent = (seconds/total)*100
  if (total == '0') return ''
  else  return `
  <div class="timer">
    <input class="timer__range" type="range" name="time" value="${seconds}" style="background: linear-gradient(
      to right,
      #ffbca2 0%,
      #ffbca2 ${percent}%,
      #a4a4a4 ${percent}%,
      #a4a4a4 100%
    );">
    <div class="timer__seconds">${seconds}</div>
  </div>
  `
  }
}

export {TimerComponent}