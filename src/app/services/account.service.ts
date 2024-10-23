import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, take } from "rxjs";
import { AccountModel } from "../models/account.model";

@Injectable({providedIn: 'root'})
export class AccountService {

    private resource: string = `${environment.baseUrl}/accounts`

    constructor(
        private _http: HttpClient
    ) {}

    public getMyAccountDetails(): Observable<AccountModel> {
        return this._http
            .get<AccountModel>(`${this.resource}/my-account`)
            .pipe(take(1));
    }

    public addMoneyToMyAccount(amount: number): Observable<AccountModel> {
        return this._http
            .post<AccountModel>(`${this.resource}/add-money-to-my-account`, {
                amount
            })
            .pipe(take(1));
    }

    public getAccount(accountNumber: string): Observable<AccountModel> {
        return this._http
            .get<AccountModel>(`${this.resource}/${accountNumber}`)
            .pipe(take(1));
    }

}