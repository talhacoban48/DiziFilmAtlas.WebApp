import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (value == null || isNaN(value)) return '';

        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        if (hours > 0 && minutes > 0) {
            return `${hours} saat ${minutes} dakika`;
        } else if (hours > 0) {
            return `${hours} saat`;
        } else {
            return `${minutes} dakika`;
        }
    }
}
