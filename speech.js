import { handleResult, reLoadCount } from './handlers';
import { colorsByLength, isDark } from './colors';

const colorsEl = document.querySelector('.colors');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const timerEl = document.querySelector('.timer');

const TOTAL_TIME = 560;
let timeLeft = TOTAL_TIME;
let timerInterval;

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
    const showTime =
      timeLeft / 60 > 1
        ? `${Math.floor(timeLeft / 60)}min ${timeLeft % 60}s`
        : `${timeLeft}s`;
    timerEl.textContent = showTime;
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
export function handleStop() {
  stopBtn.classList.add('animate');
  startBtn.classList.remove('animate');
  startBtn.disabled = false;
  stopBtn.disabled = true;
  timeLeft = TOTAL_TIME;
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
