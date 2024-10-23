export interface Transaction {
    id?: number;
    value?: number;
    status?: string;
    transaction_date?: string;
    origin_account_id?: number;
    origin_user_id?: number;
    destination_account_id?: number;
    destination_user_id?: number;
    tb_users?: {
      name?: string;
    };
    tb_accounts?: {
      account_number?: string;
      key?: string;
    };
  }
  