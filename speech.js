import { handleResult, reLoadCount, wait } from './handlers';
import { colorsByLength, isDark } from './colors';
import ToastService from './toastService.js';

const colorsEl = document.querySelector('.colors');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const timerEl = document.querySelector('.timer');

const TOTAL_TIME = 400;
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
  recognition.interimResults = false; // will not recognize as soon as it hears a word//SpeechRecognitionResult.isFinal
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

/* mobile:
// Seleccionamos los elementos del DOM que vamos a usar
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const audioPlayer = document.getElementById('recorded-audio');

// Inicializamos el objeto SpeechRecognition
const recognition = new window.webkitSpeechRecognition();

// Propiedades de la grabación
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'es-ES';

let recordingStartTime; // Momento en que la grabación comenzó
let recordingEndTime; // Momento en que la grabación terminó
let audioChunks = []; // Array para almacenar los segmentos

// Evento "touchstart" para iniciar la grabación
startBtn.addEventListener('touchstart', () => {
  recognition.start();
  recordingStartTime = Date.now();
  console.log('Comenzando la grabación');
});

// Evento "touchend" para detener la grabación
stopBtn.addEventListener('touchend', () => {
  recognition.stop();
  recordingEndTime = Date.now();
  console.log('Deteniendo la grabación');
});

// Evento "result" para procesar los resultados de la grabación
recognition.addEventListener('result', (e) => {
  // Iteramos sobre los resultados de la grabación
  for (let i = e.resultIndex; i < e.results.length; i++) {
    // Si el resultado es "final", lo añadimos al array de audioChunks
    if (e.results[i].isFinal) {
      audioChunks.push(e.results[i][0].transcript);
    }
  }
});

// Evento "end" para procesar el fin de la grabación
recognition.addEventListener('end', () => {
  // Convertimos los segmentos en una única cadena de texto y la mostramos en la consola
  const recordedText = audioChunks.join(' ');
    // Mostramos el resultado en la consola
  console.log(`Texto grabado: ${recordedText}`);
  // Convertimos los segmentos en un objeto Blob de audio y lo guardamos en el elemento <audio> como src
  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  audioPlayer.src = URL.createObjectURL(audioBlob);
  // Volvemos a poner el array de audioChunks en blanco
  audioChunks = [];
  // Habilitamos el botón de inicio y deshabilitamos el de detener
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// Evento "start" para procesar el inicio de la grabación
recognition.addEventListener('start', () => {
  console.log('La grabación ha comenzado');
  // Deshabilitamos el botón de inicio y habilitamos el de detener
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

// Evento "error" para procesar errores en la grabación
recognition.addEventListener('error', (e) => {
  console.error(`Error en la grabación: ${e.error}`);
});

 */
