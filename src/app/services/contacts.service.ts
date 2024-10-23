import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, take } from "rxjs";
import { ContactModel } from "../models/contact.model";

@Injectable({providedIn: 'root'})
export class ContactsService {

    private resource: string = `${environment.baseUrl}/contacts`;

    constructor(
        private _http: HttpClient
    ){}

    public addNewContact(userId: number): Observable<ContactModel> {
        return this._http.post<ContactModel>(`${this.resource}`, {
            user_id: userId
        }).pipe(take(1))
    }

    public getMyContacts(): Observable<ContactModel[]> {
        return this._http.get<ContactModel[]>(`${this.resource}`).pipe(take(1));
    }

}