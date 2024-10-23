import { AccountModel } from "./account.model";

export interface ContactModel {
    id: number;
    userId: number;
    contactId: number;
    contact_user?: User
}

export interface User {
    id: number;
    name: string;
    account: AccountModel
}