import { $EXPECTED_COLORS } from './colors';

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

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
  for (let index = 0; index < filteredColorsArray.length; index++) {
    if ($EXPECTED_COLORS[filteredColorsArray[index]]) {
      const color = filteredColorsArray[index];
      console.log('Good job!. Detected: ', color);
      const colorSpan = document.querySelector(`.${color}`);
      colorSpan.classList.add('got');
      document.body.style.cssText += `background-color: ${color};`;
    }
    // await wait(500);
  }
}
