import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PortalService } from 'src/app/core/services/portal/portal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  projects: Observable<Project[]> = this.portalService.getProjects();
  projectName = '';

  constructor(private authService: AuthService, private portalService: PortalService) {}

  ngOnInit() {
      this.authService.setLastPage('/home');
  }
}
