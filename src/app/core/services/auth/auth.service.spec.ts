import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsersResponse } from 'src/app/core/interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: any;
  let cookieServiceMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    cookieServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(''),
      set: jasmine.createSpy('set'),
      delete: jasmine.createSpy('delete')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: CookieService, useValue: cookieServiceMock }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate client and return users', () => {
    const mockUsersResponse: UsersResponse = {
      users: [{
        username: 'test', password: 'test', roles: [],
        name: ''
      }]
    };

    service.authenticateClient().subscribe(response => {
      expect(response).toEqual(mockUsersResponse);
    });

    const req = httpMock.expectOne('../../../../assets/json/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should login successfully and navigate to home with rememberMe true', (done: DoneFn) => {
    const mockUsersResponse: UsersResponse = {
      users: [{
        username: 'test', password: 'test', roles: [],
        name: ''
      }]
    };

    service.login('test', 'test', true).subscribe(() => {
      expect(cookieServiceMock.set).toHaveBeenCalledWith('user', JSON.stringify(mockUsersResponse.users[0]));
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
      service.isLoggedIn$.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeTrue();
        done();
      });
    });

    const req = httpMock.expectOne('../../../../assets/json/users.json');
    req.flush(mockUsersResponse);
  });

  it('should login successfully and navigate to home with rememberMe false', (done: DoneFn) => {
    const mockUsersResponse: UsersResponse = {
      users: [{
        username: 'test', password: 'test', roles: [],
        name: ''
      }]
    };

    spyOn(localStorage, 'setItem');
    service.login('test', 'test', false).subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUsersResponse.users[0]));
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
      service.isLoggedIn$.subscribe((isLoggedIn: any) => {
        expect(isLoggedIn).toBeTrue();
        done();
      });
    });

    const req = httpMock.expectOne('../../../../assets/json/users.json');
    req.flush(mockUsersResponse);
  });

  it('should return undefined if login credentials are empty', (done: DoneFn) => {
    service.login('', '', false).subscribe((response: any) => {
      expect(response).toBeUndefined();
      done();
    });
  });

  it('should check if user is authenticated from cookie', () => {
    cookieServiceMock.get.and.returnValue(JSON.stringify({ username: 'test', password: 'test' }));

    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('should check if user is authenticated from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'test', password: 'test' }));
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('should logout and navigate to login', (done: DoneFn) => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(cookieServiceMock.delete).toHaveBeenCalledWith('user');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    service.isLoggedIn$.subscribe((isLoggedIn: any) => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });

  it('should return the logged-in user from cookie', () => {
    const user = { name: '', username: 'test', password: 'test', roles: [] };
    cookieServiceMock.get.and.returnValue(JSON.stringify(user));

    const returnedUser = service.getUser();
    expect(returnedUser).toEqual(user);
  });

  it('should return the logged-in user from localStorage', () => {
    const user = { name: '', username: 'test', password: 'test', roles: [] };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));

    const returnedUser = service.getUser();
    expect(returnedUser).toEqual(user);
  });

  it('should return null when user is not logged-in', () => {
    const returnedUser = service.getUser();
    expect(returnedUser).toEqual(null);
  });

  it('should return user roles', () => {
    const user = { username: 'test', password: 'test', roles: ['admin'] };
    cookieServiceMock.get.and.returnValue(JSON.stringify(user));

    const roles = service.getUserRoles();
    expect(roles).toEqual(['admin']);
  });

  it('should set the last page if user is authenticated', () => {
    cookieServiceMock.get.and.returnValue(JSON.stringify({ username: 'test', password: 'test' }));

    service.setLastPage('/dashboard');
    expect(localStorage.getItem('last-page')).toBe('/dashboard');
  });
});