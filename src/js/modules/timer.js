let timerElements = document.querySelectorAll('.timer');

timerElements.forEach((element) => {
  let timeInMilliseconds = 1 * 60 * 1000;

  function updateTimer() {
    let hours = Math.floor(timeInMilliseconds / 3600000);
    let minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    let seconds = Math.floor((timeInMilliseconds % 60000) / 1000);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    element.textContent = `${hours}:${minutes}:${seconds}`;

    timeInMilliseconds -= 1000;

    if (timeInMilliseconds < 0) {
      clearInterval(timerInterval);
      element.textContent = '00:00:00';
      let btnLimited = document.querySelector('.btn-limited');
      btnLimited.disabled = true;

    }
  }

  updateTimer();
  let timerInterval = setInterval(updateTimer, 1000);


});
