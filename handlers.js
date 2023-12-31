import { $EXPECTED_COLORS } from './colors';
import ToastService from './toastService';
import { handleStop } from './speech.js';

const pointsEl = document.querySelector('.points');
let $COLORS_FOUNDED = [];

export function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

let correctCount = 0;

export function reLoadCount() {
  correctCount = 0;
  $COLORS_FOUNDED = [];
}

export async function handleResult({ results }) {
  // console.log('colors founded:', $COLORS_FOUNDED);
  const transc = results[results.length - 1][0].transcript; // grabs everything
  console.log('transcripted:', transc);
  // strip out any dot + lowercase
  let filteredColorsArray1 = transc
    .replace(/\s/g, '') // here we don't split by a space
    .toLowerCase()
    .split(/\.|,/g);
  let filteredColorsArray2 = transc.toLowerCase().split(/\.|,|\s/g); // here we split by a space
  const filteredColor3 = transc.replace(/\s|\.|,/g, '').toLowerCase();
  filteredColorsArray1 = filteredColorsArray1.filter((el) => {
    if (el !== '') return el;
  });
  filteredColorsArray2 = filteredColorsArray2.filter((el) => {
    if (el !== '') return el;
  });

  console.log('filteredColorsArray1: ', filteredColorsArray1);
  console.log('filteredColorsArray2: ', filteredColorsArray2);
  console.log('filteredColor3: ', filteredColor3);
  // check if they are valid colors

  const totalCount = Object.keys($EXPECTED_COLORS).length;

  // (some help for the user)
  for (let index = 0; index < filteredColorsArray1.length; index++) {
    const color = filteredColorsArray1[index];
    if ($EXPECTED_COLORS[color] && !$COLORS_FOUNDED.includes(color)) {
      // console.log('Good job!. Detected: ', color);
      ToastService.showSuccessToast(`Great job! - ${color} 🎯`);
      const colorSpan = document.querySelector(`.${color}`);
      colorSpan.classList.add('got');
      document.body.style.cssText += `background-color: ${color};`;
      ++correctCount;
      $COLORS_FOUNDED.push(color);
      pointsEl.textContent = `${correctCount} / ${totalCount}`;
      if (correctCount === totalCount) {
        console.log(correctCount);
        handleStop();
        ToastService.showGreatJob();
      }
    } else if (!$EXPECTED_COLORS[color]) {
      ToastService.showErrorToast(`
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z" />
    </svg>
      Transcripted: ${color}`);
    }
  }
  // the literal transcriptcion
  for (let index = 0; index < filteredColorsArray2.length; index++) {
    const color = filteredColorsArray2[index];
    if ($EXPECTED_COLORS[color] && !$COLORS_FOUNDED.includes(color)) {
      // console.log('Good job!. Detected: ', color);
      ToastService.showSuccessToast(`Great job! - ${color} 🎯`);
      const colorSpan = document.querySelector(`.${color}`);
      colorSpan.classList.add('got');
      document.body.style.cssText += `background-color: ${color};`;
      ++correctCount;
      $COLORS_FOUNDED.push(color);
      pointsEl.textContent = `${correctCount} / ${totalCount}`;
      if (correctCount === totalCount) {
        console.log(correctCount);
        handleStop();
        ToastService.showGreatJob();
      }
    }
    // else if (!$EXPECTED_COLORS[color]) {
    //   ToastService.showErrorToast(`
    //   <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
    //     <path
    //         d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z" />
    // </svg>
    //   Transcripted: ${color}`);
    // }
  }
  // the last combination (some help for the user)
  if (
    $EXPECTED_COLORS[filteredColor3] &&
    !$COLORS_FOUNDED.includes(filteredColor3)
  ) {
    ToastService.showSuccessToast(`Great job! - ${filteredColor3} 🎯`);
    const colorSpan = document.querySelector(`.${filteredColor3}`);
    colorSpan.classList.add('got');
    document.body.style.cssText += `background-color: ${filteredColor3};`;
    ++correctCount;
    $COLORS_FOUNDED.push(filteredColor3);
    pointsEl.textContent = `${correctCount} / ${totalCount}`;
    if (correctCount === totalCount) {
      console.log(correctCount);
      handleStop();
      ToastService.showGreatJob();
    }
    // else if (!$EXPECTED_COLORS[filteredColor3]) {
    //   ToastService.showErrorToast(`
    //   <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
    //     <path
    //         d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z" />
    // </svg>
    //   Transcripted: ${filteredColor3}`);
    // }
  }
}
