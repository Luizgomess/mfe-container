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
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private router: Router, 
    private cookieService: CookieService, 
    private http: HttpClient
  ) {}

  authenticateClient(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('../../../../assets/json/users.json');
  }

  login(username: string, password: string, rememberMe: boolean): Observable<void> {
    if (username && password) {
      return this.authenticateClient().pipe(
        map(response => {
          const user = response.users.find((user: User) => user.username === username && user.password === password);
          if (user) {
            if (rememberMe) {
              this.cookieService.set('user', JSON.stringify(user));
            } else {
              localStorage.setItem('user', JSON.stringify(user));
            }
            this.router.navigate(['/home']);
            this.loggedInSubject.next(true);
          }
        })
      );
    }
    return of(undefined);
  }

  isAuthenticated(): boolean {
    const user = this.cookieService.get('user') || localStorage.getItem('user');
    const lastUserPage = localStorage.getItem('last-page');
    this.router.navigate([lastUserPage ? lastUserPage : '/home']);

    return !!user;
  }

  logout(): void {
    this.cookieService.delete('user');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false);
  }

  getUser(): User | null {
    const user = this.cookieService.get('user') || localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRoles(): string[] {
    const user = this.getUser();
    return user ? user.roles : [];
  }

  setLastPage(page: string): void {
    if (this.isAuthenticated()) {
      localStorage.setItem('last-page', page);
    }
  }
}
