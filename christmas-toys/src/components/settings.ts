import ShowCase from './ShowCase';

export const settings: ISettings = {
  sortType: '',
  filters: {},
  sortFuncs: [],
  chosenToyNums: [],

  toggleFilter(key: keyof IData, value: string) {
    if ( !this.filters[key] ) this.filters[key] = [];

    const index = this.filters[key]?.indexOf(value);
    if (index !== -1) {
      this.filters[key]?.splice(index, 1);
    } else {
      this.filters[key]?.push(value);
    }
    console.log('this.filters', this.filters);
  },

  SortFilter(func: SortFunc){
  },
};