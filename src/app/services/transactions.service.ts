import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Filter } from "../models/filter.model";
import { Pageable } from "../models/pageable.model";
import { environment } from "../environments/environment.development";
import { Transaction } from "../models/transaction.model";

@Injectable({providedIn: 'root'})
export class TransactionService {

    private resource: string = `${environment.baseUrl}/transactions`;

    constructor(private _http: HttpClient) {}

    public paymentTransaction(transaction:any): Observable<any> {
        return this._http.post(`${this.resource}`, transaction).pipe(take(1));
    }

    public getAllTransactions(filter: Filter): Observable<Pageable<Transaction[]>> {
        return this._http
            .get<Pageable<Transaction[]>>(`${this.resource}`, {params: filter.toHttpParams()})
            .pipe(take(1));
    }

}