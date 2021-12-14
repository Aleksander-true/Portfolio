import DataBase from './DataBase';

export default class Settings extends DataBase implements ISettings {
  static #instance: Settings | undefined;

  static default: {
    shape: [],
    color: [],
    size: [],
    favorite: [],
    qty: ['1', '12'],
    year: ['1940', '2020']
  };
  
  shape: string[];  
  
  color: string[];

  size: string[];

  favorite : string[];

  cart: string[];

  filteredCardNumbers: string[];

  qty: string[];

  year: string[];

  constructor() {
    super();
    this.shape =  [];
    this.color =  [];
    this.size =   [];
    this.favorite = [];
    this.cart = [];
    this.filteredCardNumbers = super.getAllNumbers();
    this.qty = ['1', '12'];
    this.year = ['1940', '2020'];
    console.log('Settings.#default.qtyRange', this.qtyRange);

    /** Singleton */
    //if (Settings.#instance) return Settings.#instance;
    //else Settings.#instance = this;

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

  get cartNumber() {
    return this.cart.length;
  }

  get toyCards() {
    return super.filterByNumber(this.filteredCardNumbers)
      .map(item => {
        item.checked = (this.cart.includes(item.num)) ? true : false; 
        return item; 
      });
  }

  set qtyRange([min, max]: Array<string | null> ) {
    if (min == null || max == null ) this.qty = Settings.default.qty;
    else this.qty = [min, max];
  }

  get qtyRange() {
    return this.qty;
  }

  set yearRange([min, max]: Array<string | null> ) {
    if (min == null || max == null ) this.year = Settings.default.year;
    else this.year = [min, max];
  }

  get yearRange() {
    return this.year;
  }


  toggle(str: string):void {
    const key = this.getSettingsKey(str);

    const index = this[key].indexOf(str);
    if (index !== -1) {
      this[key].splice(index, 1);
    } else {
      this[key].push(str);
    }
  }

  filterOut() {
    this.filteredCardNumbers = super.filterAllKeys(this);
  }

  exclude(str: string):void {
    this.filteredCardNumbers = super.excludeValue(str, this.filteredCardNumbers);
  }

  add(str: string):void {
    this.filteredCardNumbers = super.addValue(str, this.filteredCardNumbers);
  }

  isFormatValid(saves: ISettings) {
    return  (saves.shape !== undefined); 
  }

  updateCartStore(toyNumber:string | undefined):boolean {
    if (!toyNumber) return false;
    const MAX_CART_CAPACITY = 10;
    if (this.cart.length >= MAX_CART_CAPACITY && !this.cart.includes(toyNumber)) return false;

    this.toggle(toyNumber);
    return true;
  }

  getSettingsKey(str: string): keyof ISettings  {
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
    return key;
  }
}