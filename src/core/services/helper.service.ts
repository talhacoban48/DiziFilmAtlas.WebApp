import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable({
    providedIn: "root"
})
export class HelperService {

    constructor(
        private sanitizer: DomSanitizer
    ) { }

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

    getSafeUrl(key: string) {
        const videoUrl = `https://www.youtube.com/embed/${key}?si=llfpXf6fDAEayG39`;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        return safeUrl;
    }
}