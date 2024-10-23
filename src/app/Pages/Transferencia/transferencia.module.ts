// src/app/Pages/Transferencia/transferencia.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferenciaComponent } from './transferencia.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from '../../components/menu/menu.module';
import { FooterModule } from '../../components/footer/footer.module';
import { UserDetailsModule } from '../../components/userDetails/userDetails.module';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { PipeModule } from '../../pipes/pipe.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  { path: 'transferencia', component: TransferenciaComponent },
];

@NgModule({
  declarations: [TransferenciaComponent],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    RouterModule.forChild(routes),
    MenuModule,
    FooterModule,
    UserDetailsModule,
    StepperModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  exports: [TransferenciaComponent],
})
export class TransferenciaModule {}
