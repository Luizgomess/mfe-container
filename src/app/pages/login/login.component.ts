import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  rememberMe: boolean = false;
  login$!: Observable<void>;

  constructor(private authService: AuthService) {}

  login() {
    this.login$ = this.authService.login(this.username, this.password, this.rememberMe);
  }
}
