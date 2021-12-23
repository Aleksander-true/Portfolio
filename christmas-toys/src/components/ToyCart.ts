import { settings } from './Settings';

export default class  ToyCart {
  cartNumber: HTMLElement;
  
  constructor(elementID: string) {
    this.cartNumber = document.getElementById(elementID) as HTMLElement;
    document.addEventListener('updateToyNums', () => this.updateCartNumber());
  }

  updateCartNumber() {
    this.cartNumber.textContent = String(settings.chosenToyNums.length);
  }
}