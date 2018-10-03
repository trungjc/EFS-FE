import { saveItem, setSession, clearSession } from '../../../x/storage/storage';
import { HttpApi } from '../../../x/http/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

interface ILogin {
    username: string;
    password: string;
    scope: string
}
export interface Rating {
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    total_review:number
}

export interface User {
    id: string;
    username: string;
    fullname: string;
    password: string;
    department: string;
    role: string;
    rating: Rating;
}
export function GetPercentRating(rating: Rating) {
    const amount = rating.rating1 + rating.rating2 + rating.rating3 + rating.rating4 + rating.rating5
    var rate1 = rating.rating1 / amount * 100
    var rate2 = rating.rating2 / amount * 100
    var rate3 = rating.rating3 / amount * 100
    var rate4 = rating.rating4 / amount * 100
    var rate5 = rating.rating5 / amount * 100
    return <Rating>{ rating1: rate1, rating2: rate2, rating3: rate3, rating4: rate4, rating5: rate5 }
}
interface ISession {
    id?: string;
}

interface IReply {
    session: ISession;
}
@Injectable()
export class AuthService {
    private httpApi = new HttpApi<IReply>(this.http)
    constructor(
        private http: Http,
        private  router: Router
    
    ) {
    }

    login(login: ILogin) {
        return this.httpApi.Post('api/auth/login', null, login).map((res) => {
            setSession('id', res.session.id)
            setSession('user', res.user)
            return res
        })
    }
    logout(){
        clearSession('id');
        clearSession('user');        
        this.router.navigate(["/auth/signin/"]);        
    }

    validateSession() {
        return localStorage.getItem('currentUser')
    }
}