import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(void 0))
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login with username, password and rememberMe on login', () => {
    component.username = 'testUser';
    component.password = 'testPassword';
    component.rememberMe = true;
    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith('testUser', 'testPassword', true);
  });

  it('should set login$ observable when login is called', () => {
    component.username = 'testUser';
    component.password = 'testPassword';
    component.login();

    component.login$.subscribe(response => {
      expect(response).toBeUndefined();
    });
  });
});
