import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        const path = route.routeConfig?.path;

        if(path == 'login' && !token) {
            return true;
        }

        if (!token) {
            this.router.navigate(['/']);
            return false;
        }

        if (token && path === 'login') {
            this.router.navigate(['/dashboard']);
            return false;
        }

        return true;
    }
}
