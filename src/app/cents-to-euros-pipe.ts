import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'centsToEuro'
})
export class CentsToEuroPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return '';
    }
    const euros = value / 100;
    return `€${euros.toFixed(2)}`;
  }
}
