import data from '../../data';

export default class DataBase {
  #data: IData[];

  constructor() {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  filterOut(setting: ISettings) {
    let base = this.#data;
    
    base = base.filter( item => !setting.shape.includes(item.shape));
    base = base.filter( item => !setting.color.includes(item.color));
    base = base.filter( item => !setting.size.includes(item.size));
    base = setting.favorite[0] == 'нет' ? base.filter( item => item.favorite) : base;
    
    //console.log('base', base);
    return base;
  }

}
 