import { isValidColor } from './colors';

export function handleResult({ results }) {

  const words = results[results.length - 1][0].transcript;//grabs everything
  console.log('transcripted:', words)
   // strip out any dot + lowercase 
 let colors = words.replace(/\./g, '').toLowerCase().split(' ');
 console.log('colors: ', colors)
  // check if they are valid colors
  // colors.array.forEach(color => {
    
  // });
  if (!isValidColor(colors[0])) return; // thats all!
  // if it is show the UI
  const colorSpan = document.querySelector(`.${colors}`);
  colorSpan.classList.add('got');
  console.log(colors);
  console.log('this is a valid color!');
  // change the background color with the selected color
  document.body.style.cssText += `background-color: ${colors};`;
}
