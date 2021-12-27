import { config } from '../config';

export class Settings implements ISettings{
  
  toyPage : {
    filters: ISettings['toyPage']['filters'];
    chosenToyNums: string[];
    sort: { key: keyof IToy; direction: Direction; };
  };

  treePage : {
    decorateToyNums: string[];
    backgroundImgURL: string;
    treeImgURL: string;
    garlandColor: string;
    garlandSwitch: boolean;
  };

  constructor(
    { 
      toyPage: {
        filters = {}, 
        chosenToyNums = [], 
        decorateToyNums = [], 
        sort =  { key: CardKeys.Name, direction: Direction.Direct },
      },
      treePage: {
        backgroundImgURL = config.menus.background.imgURLs[0],
        treeImgURL = config.menus.tree.imgURLs[0],
        garlandColor = 'multi-color',
        garlandSwitch = false,
      },
    }) {
    this.toyPage = {
      filters: filters,
      chosenToyNums: chosenToyNums,
      sort: sort,
    };
    this.treePage = {
      decorateToyNums: decorateToyNums,
      backgroundImgURL: backgroundImgURL,
      treeImgURL: treeImgURL,
      garlandColor: garlandColor,
      garlandSwitch: garlandSwitch,
    };
  }

  setDefault() {
    this.toyPage = {
      filters: {},
      chosenToyNums: [],
      sort: { key: CardKeys.Name, direction: Direction.Direct },
    };
    this.treePage = {
      decorateToyNums: [],
      backgroundImgURL: config.menus.background.imgURLs[0],
      treeImgURL: config.menus.tree.imgURLs[0],
      garlandColor: 'multi-color',
      garlandSwitch: false,
    };
  }

  toggleFilter(key: keyof IToy, value: string) {
    if ( !this.toyPage.filters[key] ) this.toyPage.filters[key] = [];

    const index = this.toyPage.filters[key].indexOf(value);
    if (index !== -1) {
      this.toyPage.filters[key].splice(index, 1);
    } else {
      this.toyPage.filters[key].push(value);
    }
  }

  toggleChosenToy(num: string, count: string ) {
    const index = this.toyPage.chosenToyNums.indexOf(`${num}&${count}`);
    if (index !== -1) {
      this.toyPage.chosenToyNums.splice(index, 1);
    } else {
      this.toyPage.chosenToyNums.push(`${num}&${count}`);
    }
  }

  toggleRangeFilter(key: keyof IToy, value: string[]) {
    this.toyPage.filters[key] = value;
  }
}

function isFormatValid(saveObj: Save) {
  return Boolean(saveObj.toyPage && saveObj.treePage);
}

/**Restoring settings from localStorage */
const saves = JSON.parse(localStorage.getItem('settings') as string || '{}');
const settings = (isFormatValid(saves)) ? new Settings(saves) : new Settings({ toyPage:{}, treePage:{} });

/**Save settings */
window.addEventListener('beforeunload', () => localStorage.setItem('settings', JSON.stringify(Object.assign({}, settings)))); 

export { settings };