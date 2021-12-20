import View from '../View';
import RangeSlider from '../noUiSlider/RangeSlider';
import { Options } from 'nouislider';
import Filter from '../Filter';
import ShowCase from '../ShowCase';

export default class ToysPage {
  view: View;

  qtyRangeSlider: RangeSlider;

  yearRangeSlider: RangeSlider;

  constructor() {
    this.view = new View;

    const toysPage = this.view.renderPage('main', 'toy-page-template');
    new Filter('filter-by-value');
    new ShowCase();
    this.qtyRangeSlider = new RangeSlider('qty-range', this.qtyRangeSliderOptions );
    this.yearRangeSlider = new RangeSlider('year-range', this.yearRangeSliderOptions);
  }

  get qtyRangeSliderOptions():Options {
    return {
      start: [1, 12], 
      connect: true, 
      range:{ min: 1, max: 12 }, 
      step: 1,
    };
  }

  get yearRangeSliderOptions():Options {
    return {
      start: [1940, 2020], 
      connect: true, 
      range:{ min: 1940, max: 2020 }, 
      step: 5,
    };
  }
  
}