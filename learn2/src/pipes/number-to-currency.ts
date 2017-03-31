import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appurrency'
})

export class AppCurrencyPipe implements PipeTransform {
    transform(value: string): string {
        try {
            if (!isNaN(+value)) {
                return "0.00";
            }
            return Number(+value).toFixed(2);
        } catch (e) {
            return "0.00";
        }
    }
}