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

  // transactions: Transaction[] = [
  //   {
  //     tipo: 'Entrada',
  //     valor: 10.0,
  //     status: 'Concluído',
  //     nome: 'José da Silva',
  //     conta: '0001',
  //     chave: '**********2kpMp',
  //     data: '10/10/2024 às 09:21',
  //   },
  //   {
  //     tipo: 'Saída',
  //     valor: 100.0,
  //     status: 'Erro',
  //     nome: 'Maria Cláudia',
  //     conta: '0012',
  //     chave: '**********BkuL',
  //     data: '11/10/2024 às 21:02',
  //   },
  //   {
  //     tipo: 'Entrada',
  //     valor: 450.0,
  //     status: 'Concluído',
  //     nome: 'Cida Pereira',
  //     conta: '0156',
  //     chave: '**********BajFt',
  //     data: '12/10/2024 às 06:35',
  //   },
  //   {
  //     tipo: 'Saída',
  //     valor: 1000.0,
  //     status: 'Concluído',
  //     nome: 'Rafaela Milena',
  //     conta: '0017',
  //     chave: '**********2ajLy',
  //     data: '14/10/2024 às 14:17',
  //   },
  //   {
  //     tipo: 'Entrada',
  //     valor: 50.0,
  //     status: 'Concluído',
  //     nome: 'Luana Fátima',
  //     conta: '1065',
  //     chave: '**********ukiS',
  //     data: '14/10/2024 às 18:47',
  //   },
  // ];
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
