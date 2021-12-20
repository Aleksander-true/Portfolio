interface IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
  checked?: boolean;
}

interface ISettings {
  sortType: string;
  filters: Record<keyof IData, string[]> | Record<string, never>;
  sortFuncs: SortFunc[];
  chosenToyNums: string[];

  toggleFilter(key: keyof IData, value: string): void;
  SortFilter(func: SortFunc): void;
}

type IFilters<T> = {
  [Property in keyof T]: string[];
};

type FilterFunc = (value:IData)=>boolean;
type SortFunc = (a:IData, b:IData)=>number;


