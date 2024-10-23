import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { FooterModule } from '../../components/footer/footer.module';
import { MenuModule } from '../../components/menu/menu.module';
import { UserDetailsModule } from '../../components/userDetails/userDetails.module';
import { PipeModule } from '../../pipes/pipe.module';
import { TransacoesComponent } from './transacoes.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [TransacoesComponent],
  imports: [
    TagModule,
    CardModule,
    MenuModule,
    PipeModule,
    RouterModule,
    TableModule,
    ButtonModule,
    CommonModule,
    MenubarModule,
    DividerModule,
    TooltipModule,
    FooterModule,
    PaginatorModule,
    UserDetailsModule,
  ],
  exports: [TransacoesComponent],
})
export class TransacoesModule {}
