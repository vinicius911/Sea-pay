import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router'; // Importe o RouterModule

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule, // Adicione o RouterModule aqui
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
