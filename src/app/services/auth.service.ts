import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { UserRegistration } from "../models/user.model";
import { UserAuthenticated } from "../models/user.autenticated.model";
import { environment } from "../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private resource: string = `${environment.baseUrl}/auth`

    constructor(
        private _http: HttpClient
    ) {

    }

    public signUp(user: UserRegistration): Observable<UserAuthenticated> {
        return this._http.post<UserAuthenticated>(`${this.resource}/signup`, user).pipe(take(1));
    }

    public signIn(login: string, password: string): Observable<any> {
        return this._http
            .post(`${this.resource}/signin`, {
                login,
                password
            }, { observe: 'response' })
            .pipe(take(1));
    }

    public getAuthenticatedUser(): Observable<UserAuthenticated> {
        return this._http
            .get<UserAuthenticated>(`${this.resource}/authenticated-user`)
            .pipe(take(1));
    }

    public refreshToken(): Observable<any> {
        return this._http
            .post(`${this.resource}/refresh-token`, {}, { observe: 'response' })
            .pipe(take(1));
    }

    public saveToken(token: string | null): void {
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    public getToken(): string | null {
        return localStorage.getItem('token')
    }

    public logout() {
        localStorage.removeItem('token')
    }

}
