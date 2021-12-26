
import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { config } from '../../config';
import { settings } from '../Settings';
import './_range-slider.scss';

export default class RangeSlider {
  slider: target;

  configRange: typeof config.rangeFilters.quantityRange;

  constructor(targetID: string, configRange: typeof config.rangeFilters.quantityRange) {
    this.configRange = configRange;
    this.slider = document.getElementById(targetID) as target;
    
    noUiSlider.create(this.slider, configRange.options);
    if (settings.toyPage.filters[configRange.key]) {
      this.slider.noUiSlider?.set(settings.toyPage.filters[configRange.key]);
    }
    
    this.slider.noUiSlider?.on('update', () => this.setOutput( this.slider.noUiSlider?.get() as string[], this.slider.id ));
    this.slider.noUiSlider?.on('update', () => this.updateSettings(this.slider, configRange.key, this.slider.noUiSlider?.get() as string[]));
  }

  setOutput([min, max]: string[], elementID: string):void {
    const outputMin = document.getElementById(`${elementID}-min`) as HTMLElement;
    const outputMax = document.getElementById(`${elementID}-max`) as HTMLElement;
  
    outputMin.textContent = this.format(min); 
    outputMax.textContent = this.format(max); 
  }

  updateSettings(targetElement: HTMLElement, key: keyof IToy, [min, max]: string[]) {
    settings.toggleRangeFilter(key, [this.format(min), this.format(max)]);

    const customEvent = new Event( 'updateFilter', { bubbles: true });
    targetElement.dispatchEvent(customEvent);
  }

  setDefault(){
    this.slider.noUiSlider?.set(this.configRange.options.start as number[]);
  }

  format(n:string) {
    return String(Math.round(+n));
  }
}




