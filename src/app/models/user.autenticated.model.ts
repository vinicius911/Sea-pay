import { AccountModel } from "./account.model";

export interface UserAuthenticated {
    id: number;
    email: string;
    account_type: string;
    name: string;
    registration: string;
    account: AccountModel;
}