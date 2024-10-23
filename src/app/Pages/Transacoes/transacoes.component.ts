import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transactions.service';
import { Filter } from '../../models/filter.model';
import { Transaction } from '../../models/transaction.model';
import { UserAuthenticated } from '../../models/user.autenticated.model';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss'],
})
export class TransacoesComponent implements OnInit {
  
  public transactions: Transaction[] = [];
  public userAuthenticated?: UserAuthenticated;

  public first: number = 0;
  public rows: number = 10;
  public total: number = 0;

  constructor(
    private _authService: AuthService,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._authService.getAuthenticatedUser().subscribe(response => {
        this.userAuthenticated = response;
      }),
      this.consulta('1', '10')
    ]).subscribe({next: (_) => {}, error: (error) => {}})
  }

  public consulta(page: any, limit: any) {
    return this._transactionService.getAllTransactions(new Filter({
      page: page,
      limit: limit,
      sortBy: 'transaction_date',
      order: 'desc'
    })).subscribe({
      next: (response) => {
        this.total = response.page
        this.transactions = response.data
      },
      error: (error) => {
        console.log(error);
      }
    })
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
  
  public onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.consulta(this.first, this.rows)
  }
}
