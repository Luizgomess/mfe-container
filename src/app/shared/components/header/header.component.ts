import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toggle = false;

  constructor(private authService: AuthService) {}

  showToggle() {
    this.toggle = !this.toggle;
  }

  logout(): void {
    this.authService.logout();
  }
}
