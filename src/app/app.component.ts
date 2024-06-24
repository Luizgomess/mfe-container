import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="isAuthenticated | async"></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'portal';
  isAuthenticated = this.authService.isLoggedIn$;
  constructor(private readonly authService: AuthService) {}
}
