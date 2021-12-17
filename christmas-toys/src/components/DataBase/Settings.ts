import DataBase from './DataBase';

export default class Settings extends DataBase implements ISettings {
  static #instance: Settings | undefined;

  static readonly default: ISettings['filter'] = { shape: [], color: [], size: [], favorite: [], qty: ['1', '12'], year: ['1940', '2020'] } ;

  cart: string[];

  searchExp: RegExp;

  sortType: string;

  filteredCardNumbers: string[];

  filter: { shape: string[]; color: string[]; size: string[]; favorite: string[]; qty: string[]; year: string[] };

  constructor() {
    super(); 
    this.sortType = 'sort-name-top';
    this.searchExp = /./;
    this.cart = [];
    this.filteredCardNumbers = super.getAllNumbers();
    this.filter = JSON.parse(JSON.stringify(Settings.default));

    /** Singleton */
    if (Settings.#instance) return Settings.#instance;
    else Settings.#instance = this;

    /**Restoring settings and saves from localStorage */
    const saves = JSON.parse(localStorage.getItem('settings') || '');
    if (this.isFormatValid(saves)) this.settings = saves;

    /**Save settings and saves */
    window.addEventListener('beforeunload', () => localStorage.setItem('settings', JSON.stringify(Object.assign({}, this)))); 
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
    if (min == null || max == null ) this.filter.qty = Settings.default.qty.slice();
    else this.filter.qty = [min, max];
  }

  get qtyRange():string[] {
    return this.filter.qty;
  }

  set yearRange([min, max]: Array<string | null> ) {
    if (min == null || max == null ) this.filter.year = Settings.default.year.slice();
    else this.filter.year = [min, max];
  }

  get yearRange():string[] {
    return this.filter.year;
  }

  toggle(str: string):void {
    const key = this.getSettingsKey(str);

    const index = this.filter[key].indexOf(str);
    if (index !== -1) {
      this.filter[key].splice(index, 1);
    } else {
      this.filter[key].push(str);
    }
  }

  filterOut() {
    this.filteredCardNumbers = super.filterAllKeys(this);
  }

  sort(sort = 'sort-name-top') {
    this.sortType = sort;
    const base = super.filterByNumber(this.filteredCardNumbers);
    this.filteredCardNumbers = super.sortByKey(base, sort);
  }
  
  resetFilters() {
    this.filteredCardNumbers = super.getAllNumbers();
    this.filter = JSON.parse(JSON.stringify(Settings.default));
  }

  isFormatValid(saves: ISettings) {
    return  (saves.filter !== undefined); 
  }

  updateCartStore(toyNumber:string | undefined):boolean {
    if (!toyNumber) return false;
    const MAX_CART_CAPACITY = 10;
    if (this.cart.length >= MAX_CART_CAPACITY && !this.cart.includes(toyNumber)) return false;

    const index = this.cart.indexOf(toyNumber);
    if (index !== -1) {
      this.cart.splice(index, 1);
    } else {
      this.cart.push(toyNumber);
    }
    return true;
  }

  getSettingsKey(str: string): keyof ISettings['filter']  {
    let key: keyof ISettings['filter']; 
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
      default:
        key = 'favorite';
        break;  
    }
    return key;
  }

  search(str: string) {
    this.searchExp = new RegExp(str, 'i');
    this.filterOut();
  }
}