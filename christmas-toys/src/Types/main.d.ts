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
  cart: string[];
  filteredCardNumbers: string[];
  filter: { shape: string[]; color: string[]; size: string[]; favorite: string[]; qty: string[]; year: string[] };
}

type DataKey = 'num' | 'name' | 'count' | 'year' | 'shape' | 'color' | 'size' ; 