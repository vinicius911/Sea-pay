import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transactions.service';
import { Filter } from '../../models/filter.model';
import { Transaction } from '../../models/transaction.model';
import { UserAuthenticated } from '../../models/user.autenticated.model';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public transactions: Transaction[] = [];
  public userAuthenticated?: UserAuthenticated;
  constructor(
    private _authService: AuthService,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._authService.getAuthenticatedUser().subscribe(response => {
        this.userAuthenticated = response;
      }),
      this._transactionService.getAllTransactions(new Filter({
        page: '1',
        limit: '10',
        sortBy: 'transaction_date',
        order: 'desc'
      })).subscribe({
        next: (response) => {
          this.transactions = response.data
          console.log(response)
        },
        error: (error) => {
          console.log('Deu ruim: ')
          console.log(error);
        }
      })
    ]).subscribe({next: (_) => {}, error: (error) => {}})
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Concluído':
        return 'success';
      case 'Erro':
        return 'danger';
      default:
        return 'info';
    }
  }

  transactionType(transaction: Transaction) {
    if(transaction.origin_user_id == this.userAuthenticated?.id) {
      return 'Saída';
    }

    return 'Entrada';
  }
}
