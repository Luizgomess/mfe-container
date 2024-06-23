import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portal';
  isAuthenticated = this.authService.isLoggedIn$;
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {

  }
}
