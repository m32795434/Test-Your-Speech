import { handleResult, reLoadCount } from './handlers';
import { colorsByLength, isDark } from './colors';

const colorsEl = document.querySelector('.colors');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const timerEl = document.querySelector('.timer');

let timerInterval;
let timeLeft = 240;

// new SpeechRecognition, no matters if it's one of the "webkit" versions
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
function displayColors(colors) {
  return colors
    .map(
      (color) =>
        `<span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }" style="background:${color};">${color}</span>`
    )
    .join('');
}

function startTimer() {
  timerInterval = setInterval(() => {
    timerEl.textContent = `${timeLeft} s`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      handleStop();
    }
  }, 1000);
}

function start() {
  // see if the browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('your browser does not support speech recognition');
    return;
  }
  recognition = new window.SpeechRecognition();
  console.log('recognition OK');
  colorsEl.innerHTML = displayColors(colorsByLength); // could be outside the function?
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false; // will not recognize as soon as it hears a word//SpeechRecognitionResult.isFinal
  recognition.onresult = handleResult;
  // recognition.start();
}
function handleStart() {
  recognition.start();
  startBtn.classList.add('animate');
  stopBtn.classList.remove('animate');
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startTimer();
}
function handleStop() {
  stopBtn.classList.add('animate');
  startBtn.classList.remove('animate');
  startBtn.disabled = false;
  stopBtn.disabled = true;
  timeLeft = 240;
  recognition.stop();
  clearInterval(timerInterval);
  reLoadCount();
  Array.from(document.querySelectorAll('.got')).forEach((el) =>
    el.classList.remove('got')
  );
}

start();

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
