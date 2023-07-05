import { $EXPECTED_COLORS } from './colors';
import ToastService from './toastService';

const pointsEl = document.querySelector('.points');
let $COLORS_FOUNDED = [];

function wait(ms) {
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
  // console.log('transcripted:', transc);
  // strip out any dot + lowercase
  let filteredColorsArray = transc
    .replace(/\s/g, '')
    .toLowerCase()
    .split(/\.|,/g);
  filteredColorsArray = filteredColorsArray.filter((el) => {
    if (el !== '') return el;
  });
  // console.log('colors: ', filteredColorsArray);
  // check if they are valid colors

  const totalCount = Object.keys($EXPECTED_COLORS).length;

  for (let index = 0; index < filteredColorsArray.length; index++) {
    const color = filteredColorsArray[index];
    if ($EXPECTED_COLORS[color] && !$COLORS_FOUNDED.includes(color)) {
      // console.log('Good job!. Detected: ', color);
      ToastService.showSuccessToast(`Great job! - ${color} 🎯`);
      const colorSpan = document.querySelector(`.${color}`);
      colorSpan.classList.add('got');
      document.body.style.cssText += `background-color: ${color};`;
      ++correctCount;
      $COLORS_FOUNDED.push(color);
    } else {
      ToastService.showErrorToast(`
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z" />
    </svg>
      Transcripted: ${color}`);
    }
    // await wait(500);
    pointsEl.textContent = `${correctCount} / ${totalCount}`;
  }
}
