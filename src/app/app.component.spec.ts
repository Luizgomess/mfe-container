import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn$: of(true)
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "portal"', () => {
    expect(component.title).toEqual('portal');
  });

  it('should get isAuthenticated from AuthService', (done: DoneFn) => {
    component.isAuthenticated.subscribe((isAuthenticated: any) => {
      expect(isAuthenticated).toBeTrue();
      done();
    });
  });
});