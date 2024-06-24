import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      isLoggedIn$: of(true)
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in', (done: DoneFn) => {
    authServiceMock.isLoggedIn$ = of(true);

    guard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeTrue();
      expect(routerMock.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should not allow activation if user is not logged in and redirect to /login', (done: DoneFn) => {
    authServiceMock.isLoggedIn$ = of(false);

    guard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
