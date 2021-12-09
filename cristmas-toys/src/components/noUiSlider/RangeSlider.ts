
import noUiSlider from 'nouislider';
import { target } from 'nouislider/src/nouislider';
import 'nouislider/dist/nouislider.css';
import './_range-slider.scss';

const qtyRange = document.getElementById('qty-range') as target;

noUiSlider.create(qtyRange, {
  start: [1, 12],
  connect: true,
  range: {
    'min': 1,
    'max': 12,
  },
  step: 1,
});

const yearRange = document.getElementById('year-range') as target;
noUiSlider.create(yearRange, {
  start: [1940, 2020],
  connect: true,
  range: {
    'min': 1940,
    'max': 2020,
  },
  step: 1,
}) ;

function setOutput([minValue, maxValue]: number[], elementID: string) {
  const outputMin = document.getElementById(`${elementID}-min`) as HTMLElement;
  const outputMax = document.getElementById(`${elementID}-max`) as HTMLElement;

  outputMin.textContent = String(Math.round(minValue)); 
  outputMax.textContent = String(Math.round(maxValue)); 
}

qtyRange.noUiSlider?.on('update', () => setOutput( qtyRange.noUiSlider?.get(true) as number[], qtyRange.id ));
yearRange.noUiSlider?.on('update', () => setOutput( yearRange.noUiSlider?.get(true) as number[], yearRange.id ));
