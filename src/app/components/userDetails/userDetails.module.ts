import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './userDetails.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
