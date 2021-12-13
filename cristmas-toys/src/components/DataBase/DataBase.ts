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
    let base = this.#data.filter( item => {
      return (
        !setting.shape.includes(item.shape) &&
        !setting.color.includes(item.color) &&
        !setting.size.includes(item.size) &&
        (setting.favorite[0] == 'нет') == item.favorite
      );
    });
    base = base.map(item => {item.checked = (setting.cart.includes(item.num)) ? true : false; return item; });
    console.log('base', base);
    return base;
  }

}
 