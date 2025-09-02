import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) { }
    navigateTo(commands: any[], options?: { queryParams?: any; state?: any }): void {
        this.router.navigate(commands, options);
    }
    navigateLogin(url = '/auth') {
        return this.router.navigate([url]);
    }
    navigateNotFound(url = '/notfound') {
        this.router.navigate([url]);
    }
}