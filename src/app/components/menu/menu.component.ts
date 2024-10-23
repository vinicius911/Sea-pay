import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public name = '';

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this._authService.getAuthenticatedUser().subscribe(respose => {
      this.name = respose.name;
    })
  }

  public sair(): void {
    this._authService.logout();
    this.router.navigate(['/'])
  }

}
