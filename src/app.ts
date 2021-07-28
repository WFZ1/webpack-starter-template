export default class App {
  static render(): void {
    const element = document.createElement('p');
    element.textContent = 'Hello webpack';
    document.body.append(element);
  }
}
