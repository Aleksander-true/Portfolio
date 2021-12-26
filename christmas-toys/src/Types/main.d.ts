const enum CardKeys {
  Number = 'num',
  Name = 'name',
  Count = 'count',
  Year = 'year',
  Shape = 'shape',
  Color = 'color',
  Size = 'size',
  Favorite = 'favorite',
}

enum Shape { 
  Ball = 'шар',
  Bell = 'колокольчик',
  Con = 'шишка',
  Snowflake = 'снежинка',
  Figure = 'фигурка',
}

const enum Favorite {
  True = 'да',
  False = 'нет',
}

type Card = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
};

interface IToy extends Card{
  favorite: boolean;
}

interface ISettings {
  filters: Record<keyof IToy, string[]> | Record<string, never>;
  chosenToyNums: string[];
  sort: { key: keyof IToy; direction: Direction; };

  toggleFilter(key: keyof ICard, value: string): void;
  toggleRangeFilter(key: keyof ICard, value: string[]):void;
}

const enum Direction {
  Direct = 'direct',
  Reverse = 'reverse',
}

type FilterFunc = (value:IToy)=>boolean;
type SortFunc = (a:IToy, b:IToy)=>number;


