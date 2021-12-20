import { Options } from 'nouislider';

export const config = {
  filters: [
    { 
      text:'Форма: ', 
      key: 'shape' as keyof IData, 
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
      text:'Цвет: ', 
      key: 'color' as keyof IData, 
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
      text:'Размер: ', 
      key: 'size' as keyof IData, 
      classes: ['filter'],
      options:[
        { value:'большой', classes: ['filter__icon', 'filter__icon_ball', 'filter__icon_big'] },
        { value:'средний', classes: ['filter__icon', 'filter__icon_ball'] }, 
        { value:'малый', classes: ['filter__icon', 'filter__icon_ball', 'filter__icon_small'] }, 
      ],
    },
    { 
      text:'Любимые: ', 
      key: 'favorite' as keyof IData, 
      classes: ['filter'],
      options:[
        { value:'да', classes: ['filter__check'] }, 
      ],
    },
  ],
  sorts: [
    { name: 'sort-name-top', value: 'name', direction: 'direct' },
    { name: 'sort-name-bottom', value: 'name', direction: 'reverse' },
    { name: 'sort-count-max', value: 'count', direction: 'direct' },
    { name: 'sort-count-min', value: 'count', direction: 'reverse' },
  ],
  rangeFilters: {
    qtyRange: {
      key: 'count' as keyof IData, 
      classes: 'qty-range',
      options: {
        start: [1, 12], 
        connect: true, 
        range:{ min: 1, max: 12 }, 
        step: 1,
      } as Options,
    },
    yearRange: {
      key: 'year' as keyof IData, 
      classes: 'qty-range',
      options: {
        start: [1940, 2020], 
        connect: true, 
        range:{ min: 1940, max: 2020 }, 
        step: 5,
      } as Options,
    },
  },
};