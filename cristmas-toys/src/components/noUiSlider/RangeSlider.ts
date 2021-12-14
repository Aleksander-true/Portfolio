
import noUiSlider, { Options, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './_range-slider.scss';

export default class RangeSlider {
  constructor(targetID: string, options: Options) {
    const qtyRange = document.getElementById(targetID) as target;

    noUiSlider.create(qtyRange, options);

    qtyRange.noUiSlider?.on('update', () => this.setOutput( qtyRange.noUiSlider?.get(true) as number[], qtyRange.id ));
    qtyRange.noUiSlider?.on('update', () => this.customEvent(qtyRange));

  }

  setOutput([minValue, maxValue]: number[], elementID: string):void {
    const outputMin = document.getElementById(`${elementID}-min`) as HTMLElement;
    const outputMax = document.getElementById(`${elementID}-max`) as HTMLElement;
  
    outputMin.textContent = String(Math.round(minValue)); 
    outputMax.textContent = String(Math.round(maxValue)); 
  }

  customEvent(element : target){
    const event = new Event( 'update', { bubbles: true });
    element.dispatchEvent(event);
  }
}




