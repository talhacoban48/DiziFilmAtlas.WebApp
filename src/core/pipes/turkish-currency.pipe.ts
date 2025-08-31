import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'turkishCurrency'
})
export class TurkishCurrencyPipe implements PipeTransform {
    transform(value: number | string): string {
        if (value === null || value === undefined) return '';
        const num = Number(value);
        if (isNaN(num)) return '';

        const formatted = new Intl.NumberFormat('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);

        return `${formatted} $`;
    }
}