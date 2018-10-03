import { getItem, getSession } from '../../../x/storage/storage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = getSession('user')
        if (user!= null) {
            // if(user.role == 'admin'||user.role == 'super-admin') {
            //     return true
            // }
            return true
        }
        this.router.navigate(['/auth/signin'],{ queryParams: { returnUrl: state.url }})
        return false;
    }
}