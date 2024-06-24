import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PortalService } from 'src/app/core/services/portal/portal.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceMock: any;
  let portalServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      setLastPage: jasmine.createSpy('setLastPage')
    };

    portalServiceMock = {
      getProjects: jasmine.createSpy('getProjects').and.returnValue(of([
        {
          name: 'Parceiros',
          route: '/partners',
          description: 'acesse o portal de parceiros e administre os parceiros podendo adicionar, editar ou deletar algum parceiro',
          permissions: ['fin-partners']
        },
        {
          name: 'Empresas externas',
          route: '/external-companies',
          description: 'acesse o portal de empresas externas e administre os parceiros podendo adicionar, editar ou deletar algum parceiro',
          permissions: ['fin-external-comp']
        }
      ]))
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: PortalService, useValue: portalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set last page to "/home" on init', () => {
    component.ngOnInit();
    expect(authServiceMock.setLastPage).toHaveBeenCalledWith('/home');
  });

  it('should get projects from portal service', () => {
    component.projects.subscribe(projects => {
      expect(projects.length).toBe(2);
      expect(projects[0].name).toBe('Parceiros');
      expect(projects[1].name).toBe('Empresas externas');
    });
    expect(portalServiceMock.getProjects).toHaveBeenCalled();
  });
});
