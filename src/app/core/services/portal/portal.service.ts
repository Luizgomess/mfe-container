import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Project, ProjectsResponse } from '../../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProjects(): Observable<Project[]> {
    const roles = this.authService.getUserRoles();
    return this.http.get<ProjectsResponse>('../../../../assets/json/projects.json').pipe(
      map(response => response.projects),
      map(projects => {
        return projects.filter(project => 
          project.permissions.some((permission: string) => 
            roles.includes(permission)
          )
        );
      })
    )
  }
}
