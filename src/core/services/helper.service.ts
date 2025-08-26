import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class HelperService {

    getPagesArray(totalPages: number, currentPage: number): number[] {
        let result: number[] = [];
        if (totalPages > 500) {
            totalPages = 500;
        }
        let array: number[] = [1, 2, 3, 4, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, totalPages - 2, totalPages - 1, totalPages]

        for (let i of array) {
            if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < totalPages) {
                result.push(i);
            }
        }
        return result;
    }

    getFloor(average: number): number {
        return Number(average.toFixed(1));
    }
}