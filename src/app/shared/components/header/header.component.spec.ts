import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the value of toggle when showToggle is called', () => {
    expect(component.toggle).toBeFalse();
    component.showToggle();
    expect(component.toggle).toBeTrue();
    component.showToggle();
    expect(component.toggle).toBeFalse();
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
