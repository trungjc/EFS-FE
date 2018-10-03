import { getItem, getSession } from '../../../x/storage/storage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private route: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = getSession('user')
        if (user != null) {
            if (user.role=='staff') {
                return true
            }
        }
        this.route.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } })
        return false;
    }
}