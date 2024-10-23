import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserAuthenticated } from '../../models/user.autenticated.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss'],
})
export class UserDetailsComponent implements OnInit{
  userDetails?: UserAuthenticated;

  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._authService.getAuthenticatedUser().subscribe((response: UserAuthenticated) => {
      this.userDetails = response;
    })
  }

  hideInfo = false;

  copyKey(): void {
    navigator.clipboard.writeText(this.userDetails?.account?.key ?? '');
  }

  toggleHideInfo(): void {
    this.hideInfo = !this.hideInfo;
  }

  getMaskedKey(): string {
    const key = this.userDetails?.account?.key ?? '';
    const visiblePart = key.slice(-5);
    const maskedPart = key.slice(0, -5).replace(/[a-zA-Z0-9]/g, '*');
    return maskedPart + visiblePart;
  }
}
