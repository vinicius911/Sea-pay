import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transactions.service';
import { ContactsService } from '../../services/contacts.service';
import { ContactModel } from '../../models/contact.model';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {

  active: number = 0;
  selectedAccount = '';
  contacts: ContactModel[] = [];
  
  accountNumber: any;
  account: any;
  saveContact: any;
  value: any = 0;


  constructor(
    private _accountService: AccountService,
    private _transactionService: TransactionService,
    private _contactService: ContactsService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._contactService.getMyContacts().subscribe({next: (contacts) => {
      this.contacts = contacts
    }})
  }

  public searchAccount(nextCallback: any) {

    this._accountService.getAccount(this.accountNumber).subscribe({
      next: (account) => {
        this.account = account
        nextCallback.emit();
      }
    })
  }

  public confirmPayment(): void {

    const forkJoins = []

    if(this.saveContact) {
      forkJoins.push(this._contactService.addNewContact(this.account.user_id).subscribe({
        next: (_) => {}
      }))
    }

    forkJoins.push(this._transactionService.paymentTransaction({
      value: parseFloat(this.value),
      destination_user_id: this.account.user_id
    }).subscribe({
      next: (_) => {
        this._messageService.add({severity: 'success', summary: 'Transferência', detail: 'Transação realizada com sucesso!'})
        this._router.navigate(['/dashboard'])
      }
    }))

    forkJoin(forkJoins).subscribe({next: (_) => {
    }, error: (error: HttpErrorResponse) => {
    }})

  }

  public selectContact(contact: ContactModel): void {
    this.accountNumber = `${contact.contact_user?.id}`.padStart(4, '0');
  }

  public accountAlredySaved(): boolean {
    return this.contacts.find(p => `${p.contact_user?.id}`.padStart(4, '0') == this.accountNumber) != null
  }
}
