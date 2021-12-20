
import noUiSlider, { Options, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { config } from '../config';
import { settings } from '../settings';
import ShowCase from '../ShowCase';
import './_range-slider.scss';

export default class RangeSlider {
  slider: target;

  constructor(targetID: string, configRange: typeof config.rangeFilters.qtyRange) {
    this.slider = document.getElementById(targetID) as target;
    
    noUiSlider.create(this.slider, configRange.options);

    this.slider.noUiSlider?.on('update', () => this.setOutput( this.slider.noUiSlider?.get() as string[], this.slider.id ));
    this.slider.noUiSlider?.on('update', () => this.updateSettings( configRange.key, this.slider.noUiSlider?.get() as string[]));
    this.slider.noUiSlider?.on('update', () => this.customEvent(this.slider));
  }

  setRange( [min, max]: string[]) {
    this.slider.noUiSlider?.set([min, max]);
  }

  getRange() {
    const [min, max] = this.slider.noUiSlider?.get()  as string[];
    return [this.format(min), this.format(max)];
  }

  setOutput([min, max]: string[], elementID: string):void {
    const outputMin = document.getElementById(`${elementID}-min`) as HTMLElement;
    const outputMax = document.getElementById(`${elementID}-max`) as HTMLElement;
  
    outputMin.textContent = this.format(min); 
    outputMax.textContent = this.format(max); 
  }

  format(n:string) {
    return String(Math.round(+n));
  }

  customEvent(element : target){
    const event = new Event( 'update', { bubbles: true });
    element.dispatchEvent(event);
  }

  updateSettings(key: keyof IData, [min, max]: string[]) {
    const value = `${this.format(min)}-${this.format(max)}`;
    settings.toggleFilter(key, value);
    new ShowCase();
  }
}




