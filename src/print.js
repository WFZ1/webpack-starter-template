export default function printMe() {
  const p = document.createElement('p');
  p.innerHTML = 'I get called from print.js!';
  return p;
}
