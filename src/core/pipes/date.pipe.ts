import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dayMonthYear', standalone: true })
export class DayMonthYearPipe implements PipeTransform {
    transform(value: string | number | Date | null | undefined, numeric: boolean = false): string {
        if (value == null) return '';

        let d: Date;
        const iso = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
        if (iso) {
            const [y, m, day] = value.split('-').map(Number);
            d = new Date(y, m - 1, day);
        } else {
            d = new Date(value as any);
        }
        if (isNaN(d.getTime())) return '';

        const fmt = new Intl.DateTimeFormat('tr-TR', {
            day: '2-digit',
            month: numeric ? '2-digit' : 'long',
            year: 'numeric'
        });
        return fmt.format(d);
    }
}