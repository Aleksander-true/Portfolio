import { Options } from 'nouislider';

export const config = {
  filters: [
    { 
      parentElementID: 'filter-by-value',
      text:'Форма: ', 
      key: CardKeys.Shape, 
      classes: ['filter'],
      options:[
        { value:'шар', classes: ['filter__icon', 'filter__icon_ball'] }, 
        { value:'шишка', classes: ['filter__icon', 'filter__icon_cone'] }, 
        { value:'колокольчик', classes: ['filter__icon', 'filter__icon_bell'] }, 
        { value:'снежинка', classes: ['filter__icon', 'filter__icon_snowflake'] }, 
        { value:'фигурка', classes: ['filter__icon', 'filter__icon_figure'] }, 
      ],
    },
    { 
      parentElementID: 'filter-by-value',
      text:'Цвет: ', 
      key: CardKeys.Color, 
      classes: ['filter'],
      options:[
        { value:'белый', classes: ['filter__check', 'filter__check_white'] }, 
        { value:'желтый', classes: ['filter__check', 'filter__check_yellow'] }, 
        { value:'красный', classes: ['filter__check', 'filter__check_red'] }, 
        { value:'синий', classes: ['filter__check', 'filter__check_blue'] }, 
        { value:'зелёный', classes: ['filter__check', 'filter__check_green'] }, 
      ],
    },
    { 
      parentElementID: 'filter-by-value',
      text:'Размер: ', 
      key: CardKeys.Size, 
      classes: ['filter'],
      options:[
        { value:'большой', classes: ['filter__icon', 'filter__icon_ball', 'filter__icon_big'] },
        { value:'средний', classes: ['filter__icon', 'filter__icon_ball'] }, 
        { value:'малый', classes: ['filter__icon', 'filter__icon_ball', 'filter__icon_small'] }, 
      ],
    },
    { 
      parentElementID: 'filter-by-value',
      text:'Любимые: ', 
      key: CardKeys.Favorite, 
      classes: ['filter'],
      options:[
        { value:'да', classes: ['filter__check'] }, 
      ],
    },
  ],
  select: {
    parentElementID: 'sorting-cards',
    classes: 'sort__select',
    options: [
      { value: 'sort-name-top', text: 'По названию от "А" до "Я"', key: CardKeys.Name, direction: Direction.Direct, classes: 'sort__option' },
      { value: 'sort-name-bottom', text: 'По названию от "Я" до "А"', key: CardKeys.Name, direction: Direction.Reverse, classes: 'sort__option' },
      { value: 'sort-count-max', text: 'По количеству по возрастанию', key: CardKeys.Count, direction: Direction.Direct, classes: 'sort__option' },
      { value: 'sort-count-min', text: 'По количеству по убыванию', key: CardKeys.Count, direction: Direction.Reverse, classes: 'sort__option' },
    ],
  },
  rangeFilters: {
    quantityRange: {
      key: 'count' as keyof IToy, 
      classes: 'quantity-range',
      options: {
        start: [1, 12], 
        connect: true, 
        range:{ min: 1, max: 12 }, 
        step: 1,
      } as Options,
    },
    yearRange: {
      key: 'year' as keyof IToy, 
      classes: 'quantity-range',
      options: {
        start: [1940, 2020], 
        connect: true, 
        range:{ min: 1940, max: 2020 }, 
        step: 10,
      } as Options,
    },
  },
};