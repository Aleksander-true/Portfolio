import data from '../../data';

export default class DataBase {
  readonly #data: IData[];

  constructor() {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  getAllNumbers():string[] {
    return this.#data.map(item => item.num);
  }

  filterAllKeys(setting: ISettings):string[] {
    const base = this.#data.filter( item => {
      return (
        !setting.shape.includes(item.shape) &&
        !setting.color.includes(item.color) &&
        !setting.size.includes(item.size) &&
        (setting.favorite[0] == 'нет') == item.favorite &&
        (+item.count >= +setting.qty[0] && +item.count <= +setting.qty[1]) &&
        (+item.year >= +setting.year[0] && +item.year <= +setting.year[1])
      );
    });
    return base.map(item => item.num);
  }

  excludeValue(value: string, cardNumbers: string[]):string[]  {
    const INDEX_SHIFT = 1;
    const key = this.getDataKey(value);

    console.log('cardNumbers1', cardNumbers);

    cardNumbers =  cardNumbers.filter( num => {
      const cardData = this.#data[+num - INDEX_SHIFT];
      return !(cardData[key] == value);
    });
    console.log('cardNumbers2', cardNumbers);
    return cardNumbers;
  }

  addValue(value: string, cardNumbers: string[]):string[] {
    const INDEX_SHIFT = 1;
    const key = this.getDataKey(value);

    const filteredData = this.#data.filter( item => item[key] === value);
    return cardNumbers.concat(filteredData.map(item => String(+item.num + INDEX_SHIFT)));
  }

  filterByNumber(numbers: string[]): IData[] {
    const INDEX_SHIFT = 1;
    return numbers.map( num => this.#data[+num - INDEX_SHIFT]);
  }

  getDataKey(str: string): keyof IData  {
    let key: keyof IData; 
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
        key = 'num';
        break;  
    }
    return key;
  }

}
 