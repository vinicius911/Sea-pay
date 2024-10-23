import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { LoginComponent } from './Pages/Login/login.component';
import { TransacoesComponent } from './Pages/Transacoes/transacoes.component';
import { TransferenciaComponent } from './Pages/Transferencia/transferencia.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard] },
  { path: 'transferencia', component: TransferenciaComponent, canActivate: [AuthenticatedGuard] },
  { path: 'transacoes', component: TransacoesComponent, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }