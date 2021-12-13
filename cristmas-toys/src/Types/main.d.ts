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
  shape: string[];
  color: string[];
  size: string[];
  favorite : string[];
  cart: string[];
}

type DataKey = 'num' | 'name' | 'count' | 'year' | 'shape' | 'color' | 'size' ; 