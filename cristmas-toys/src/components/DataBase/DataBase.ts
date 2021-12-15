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
        !setting.filter.shape.includes(item.shape) &&
        !setting.filter.color.includes(item.color) &&
        !setting.filter.size.includes(item.size) &&
        ((setting.filter.favorite[0] == 'да') ? item.favorite : true) &&
        (+item.count >= +setting.filter.qty[0] && +item.count <= +setting.filter.qty[1]) &&
        (+item.year >= +setting.filter.year[0] && +item.year <= +setting.filter.year[1])
      );
    });
    return this.sortByKey(base, setting.sortType);
  }

  filterByNumber(numbers: string[]): IData[] {
    const INDEX_SHIFT = 1;
    return numbers.map( num => this.#data[+num - INDEX_SHIFT]);
  }

  sortByKey(base: IData[], sort:string) {
    let key: keyof IData, direction:'direct' | 'reverse';
    switch (sort) {
      case 'sort-name-bottom':
        key = 'name'; direction = 'reverse'; break;
      case 'sort-count-max':
        key = 'count'; direction = 'direct'; break;
      case 'sort-count-min':
        key = 'count'; direction = 'reverse'; break;
      default:
        key = 'name'; direction = 'direct'; 
        break;
    }

    if (key === 'name' && direction === 'direct') {
      base.sort( (a:IData, b:IData):number => (a[key] as string) > (b[key] as string) ? 1 : -1 );

    } else if (key === 'name' && direction === 'reverse') {
      base.sort( (a:IData, b:IData):number => (a[key] as string) < (b[key] as string) ? 1 : -1);

    } else if (key === 'count' && direction === 'direct') {
      base.sort( (a:IData, b:IData):number => +(a[key] as string) > +(b[key] as string) ? 1 : -1);

    } else if (key === 'count' && direction === 'reverse') {
      base.sort( (a:IData, b:IData):number => +(a[key] as string) < +(b[key] as string) ? 1 : -1);
    } 
    return base.map(item => item.num);
  }

}

 