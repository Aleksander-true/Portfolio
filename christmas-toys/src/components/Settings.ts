export class Settings implements ISettings{
  filters: ISettings['filters'];

  chosenToyNums: string[];

  decorateToyNums: string[];

  sort: { key: keyof IToy; direction: Direction; };

  constructor({ filters = {}, chosenToyNums = [], decorateToyNums = [], sort =  { key: CardKeys.Name, direction: Direction.Direct } }) {
    this.filters = filters;
    this.chosenToyNums = chosenToyNums;
    this.decorateToyNums = decorateToyNums;
    this.sort = sort;
  }

  setDefault() {
    this.filters = {};
    this.chosenToyNums = [];
    this.decorateToyNums = [];
    this.sort = { key: CardKeys.Name, direction: Direction.Direct };
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

type Save = {
  filters: Record<keyof IToy, string[]> | Record<string, never>;
  chosenToyNums: string[]; 
  decorateToyNums: string[]; 
};

function isFormatValid(saveObj: Save) {
  return Boolean(saveObj.filters && saveObj.chosenToyNums && saveObj.decorateToyNums);
}

/**Restoring settings from localStorage */
const saves = JSON.parse(localStorage.getItem('settings') as string || '{}');
const settings = (isFormatValid(saves)) ? new Settings(saves) : new Settings({});
console.log('settings start', settings);

/**Save settings */
window.addEventListener('beforeunload', () => localStorage.setItem('settings', JSON.stringify(Object.assign({}, settings)))); 

export { settings };