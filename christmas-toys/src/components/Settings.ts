class Settings implements ISettings{
  filters: ISettings['filters'];

  chosenToyNums: string[];

  decorateToyNums: string[];

  sortFunc: SortFunc;

  constructor() {
    this.filters = {};
    this.chosenToyNums = [];
    this.decorateToyNums = [];
    this.sortFunc = (a, b)=>0;
  }

  toggleFilter(key: keyof IToy, value: string) {
    if ( !this.filters[key] ) this.filters[key] = [];

    const index = this.filters[key].indexOf(value);
    if (index !== -1) {
      this.filters[key].splice(index, 1);
    } else {
      this.filters[key].push(value);
    }
  }

  toggleChosenToy(num: string, count: string ) {
    const index = this.chosenToyNums.indexOf(`${num}&${count}`);
    if (index !== -1) {
      this.chosenToyNums.splice(index, 1);
    } else {
      this.chosenToyNums.push(`${num}&${count}`);
    }
  }

  toggleRangeFilter(key: keyof IToy, value: string[]) {
    this.filters[key] = value;
  }

}

const settings = new Settings();
export { settings };