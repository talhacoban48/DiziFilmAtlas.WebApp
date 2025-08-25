import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) { }

    navigateTo(path: string): void {
        this.router.navigate([path]);
    }
    navigateLogin(url = '/auth') {
        return this.router.navigate([url]);
    }
    navigateNotFound(url = '/notfound') {
        this.router.navigate([url]);
    }
}