import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User, UsersResponse } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {}
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  public isLoggedIn$ = this.loggedInSubject.asObservable();

  authenticateClient(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('../../../../assets/json/users.json');
  }

  login(username: string, password: string): Observable<void> {
    if(username && password) {
      return this.authenticateClient().pipe(
        map(response => {
          response.users.map((user: User) => {
            if(user.username === username && user.password === password) {
              this.cookieService.set('user', JSON.stringify(user));
              this.router.navigate(['/home']);
              this.loggedInSubject.next(true);
            }
          })
        })
      )
    }
    return of(undefined);
  }

  isAuthenticated(): boolean {
    const user = this.cookieService.get('user');
    const lastUserPage = localStorage.getItem('last-page');
    this.router.navigate([lastUserPage ? lastUserPage : '/home']);

    if(user) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false);
  }

  getUser(): User | null {
    return this.isAuthenticated() ? JSON.parse(this.cookieService.get('user')) : null;
  }

  getUserRoles(): string[] {
    const userData = JSON.parse(this.cookieService.get('user'))
    return userData.roles;
  }

  setLastPage(page: string): void {
    if (this.isAuthenticated()) {
      localStorage.setItem('last-page', page);
    }
  }
}
