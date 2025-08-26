import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {

    transform(birthDate: string | Date): number {
        if (!birthDate) return 0;

        const birth = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

}
