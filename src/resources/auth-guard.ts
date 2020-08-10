import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private static loggedIn = false;

    constructor(
        private router: Router,
    ) {
        const user = localStorage.getItem('user');
        AuthGuard.loggedIn = (user !== undefined && user !== null);

        if (AuthGuard.loggedIn) {
            this.router.navigate(['/routes']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    static saveUser(user) {
        this.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(user));
    }

    static removeUser() {
        this.loggedIn = false;
        localStorage.removeItem('user');
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!AuthGuard.loggedIn) {
            return this.router.navigate(['/login']);
        }

        return AuthGuard.loggedIn;
    }

    public getGuardAuthentication(): boolean {
        console.log(AuthGuard.loggedIn);
        return AuthGuard.loggedIn;
    }
}

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private authGuard: AuthGuard,
    ) { }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authGuard.getGuardAuthentication()) {
            this.router.navigate(['/routes']);
        }
        return true;
    }
}