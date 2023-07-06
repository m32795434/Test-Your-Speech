import { handleResult, reLoadCount, wait } from './handlers';
import { colorsByLength, isDark } from './colors';
import ToastService from './toastService.js';

const colorsEl = document.querySelector('.colors');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const timerEl = document.querySelector('.timer');

const TOTAL_TIME = 560;
let timeLeft = TOTAL_TIME;
let timerInterval;
let audioStart = false;
let stopped = false;

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
    ToastService.showErrorToast(
      'Damn! your browser does not support speech recognition 😕. Try with another browser'
    );
    return;
  }
  ToastService.showWelcome();
  recognition = new window.SpeechRecognition();
  console.log('recognition OK');
  colorsEl.innerHTML = displayColors(colorsByLength); // could be outside the function?
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true; // will recognize as soon as it hears a word//SpeechRecognitionResult.isFinal
  recognition.onresult = handleResult;

  recognition.onaudiostart = () => {
    audioStart = true;
    stopped = false;
  };
  recognition.onsoundend = () => {
    // ToastService.showErrorToast('Sound has stopped being received');
    console.log('Sound has stopped being received'); // FIRST!
    // handleStop();
  };
  recognition.onend = () => {
    ToastService.showErrorToast('Speech recognition service disconnected');
    console.log('Speech recognition service disconnected'); // THIRD!
    if (!stopped) handleStop();
  };
  recognition.onaudioend = () => {
    console.log('Audio capturing ended'); // SECOND!
  };
  // recognition.start();
}
async function handleStart() {
  if (!recognition) return;
  recognition.start();
  await wait(500);
  if (!audioStart) {
    ToastService.showErrorToast(
      "Audio capturing hasn't started. Have you authorize the microphone?. Then refresh for better performance"
    );
    recognition.stop();
    return;
  }
  startBtn.classList.add('animate');
  stopBtn.classList.remove('animate');
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startTimer();
}

export function handleStop() {
  if (!recognition) return;
  stopped = true;
  audioStart = false;
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
