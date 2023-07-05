import { $EXPECTED_COLORS } from './colors';
import ToastService from './toastService';

const pointsEl = document.querySelector('.points');
const $COLORS_FOUNDED = [];

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

let correctCount = 0;

export async function handleResult({ results }) {
  const transc = results[results.length - 1][0].transcript; // grabs everything
  console.log('transcripted:', transc);
  // strip out any dot + lowercase
  const filteredColorsArray = transc
    .replace(/\s/g, '')
    .toLowerCase()
    .split(/\.|,/g);
  console.log('colors: ', filteredColorsArray);
  // check if they are valid colors

  const totalCount = Object.keys($EXPECTED_COLORS).length;

  for (let index = 0; index < filteredColorsArray.length; index++) {
    const color = filteredColorsArray[index];
    if ($EXPECTED_COLORS[color] && !$COLORS_FOUNDED.includes(color)) {
      // console.log('Good job!. Detected: ', color);
      ToastService.showSuccessToast(`Good job!. Detected: ${color}`);
      const colorSpan = document.querySelector(`.${color}`);
      colorSpan.classList.add('got');
      document.body.style.cssText += `background-color: ${color};`;
      ++correctCount;
      $COLORS_FOUNDED.push(color);
    } else if (color) {
      ToastService.showErrorToast(`Transcripted: ${color}`);
    }
    // await wait(500);
    pointsEl.textContent = `${correctCount} / ${totalCount}`;
  }
}
