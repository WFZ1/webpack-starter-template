import './style.scss';
import image from './assets/images/typescript.png';
import printMe from './print';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = 'Hello webpack';

  btn.innerHTML = 'Click me!';
  btn.addEventListener('click', () => { element.appendChild(printMe()); }, { once: true });

  element.appendChild(btn);

  // Add the image to our existing div.
  const myImage = new Image();
  myImage.src = image;
  element.appendChild(myImage);

  return element;
}

document.body.appendChild(component());
