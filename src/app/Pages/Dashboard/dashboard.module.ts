import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from '../../components/menu/menu.module';
import { FooterModule } from '../../components/footer/footer.module';
import { UserDetailsModule } from '../../components/userDetails/userDetails.module';
import { MaskPipe } from '../../pipes/mask.pipe';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    PipeModule,
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    TagModule,
    DividerModule,
    TooltipModule,
    MenuModule,
    FooterModule,
    UserDetailsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
