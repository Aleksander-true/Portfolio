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

  constructor() {
    this.shape =  [];
    this.color =  [];
    this.size =   [];
    this.favorite = [];

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

  setDefault() {
    this.settings = Settings.#default;
  }

  toggle(key: keyof ISettings, str: string):void {
    console.log('toggle', key, str);
    console.log('this.favorite = []', this.favorite);
    /*
    if (key === 'favorite') {
      this.favorite = (this.favorite[0] === 'да') ? ['нет'] : ['да'];
      return; 
    }
    */
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

}