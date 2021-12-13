export default class Settings implements ISettings {
  static #instance: Settings | undefined;

  static #default: {
    shape:  ['шар', 'шишка', 'колокольчик', 'снежинка', 'фигурка'];
    color:  ['белый', 'красный', 'желтый', 'синий', 'зелённый'];
    size:   ['малый', 'средний', 'большой'];
    favorite: ['нет'],
  };
  
  shape: string[];  
  
  color: string[];

  size: string[];

  favorite : string[];

  cart: string[];

  filteredCardNumbers: string[];

  constructor() {
    this.shape =  [];
    this.color =  [];
    this.size =   [];
    this.favorite = [];
    this.cart = [];
    this.filteredCardNumbers = [];

    /** Singleton */
    if (Settings.#instance) return Settings.#instance;
    else Settings.#instance = this;

    /**Restoring settings and saves from localStorage */
    //const saves = JSON.parse(localStorage.getItem('settings') || '');
    //if (this.isFormatValid(saves)) this.settings = saves;

    /**Save settings and saves */
    //window.addEventListener('beforeunload', () => localStorage.setItem('settings', JSON.stringify(Object.assign({}, this)))); 
  }

  set settings(settingsObj: ISettings) {
    Object.assign(this, settingsObj);
  }

  get settings() {
    return Object.assign({}, this);
  }

  toggle(str: string):void {
    let key: keyof ISettings; 
    switch (str) {
      case 'шар': case 'шишка': case 'колокольчик': case 'снежинка': case 'фигурка':
        key = 'shape';  
        break;
      case 'белый': case 'красный': case 'желтый': case 'синий': case 'зелёный':
        key = 'color';  
        break;
      case 'малый': case 'средний': case 'большой':
        key = 'size';  
        break;
      case 'нет':
        key = 'favorite';
        break;  
      default: 
        key = 'cart';  
        break;  
    }

    const index = this[key].indexOf(str);
    if (index !== -1) {
      this[key].splice(index, 1);
    } else {
      this[key].push(str);
    }
  }

  isFormatValid(saves: ISettings) {
    return  (saves.shape !== undefined); 
  }

  updateCartStore(toyNumber:string | undefined):boolean {
    if (!toyNumber) return false;
    const MAX_CART_CAPACITY = 10;
    if (this.cart.length >= MAX_CART_CAPACITY && !this.cart.includes(toyNumber)) return false;

    this.toggle(toyNumber);
    //console.log('cart', this.cart);
    return true;
  }

  get cartNumber() {
    return this.cart.length;
  }
}