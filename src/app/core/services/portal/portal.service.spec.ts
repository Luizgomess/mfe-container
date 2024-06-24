import { TestBed } from '@angular/core/testing';
import { PortalService } from './portal.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth.service';
import { ProjectsResponse } from '../../interfaces/project.interface';

describe('PortalService', () => {
  let service: PortalService;
  let httpMock: HttpTestingController;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      getUserRoles: jasmine.createSpy('getUserRoles').and.returnValue(['admin'])
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PortalService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(PortalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects and filter them based on user roles', () => {
    const mockProjectsResponse: ProjectsResponse = {
      projects: [
        {
          name: 'Project 1', permissions: ['admin', 'user'],
          route: '',
          description: ''
        },
        {
          name: 'Project 2', permissions: ['user'],
          route: '',
          description: ''
        }
      ]
    };

    service.getProjects().subscribe((projects) => {
      expect(projects.length).toBe(1);
      expect(projects[0].name).toBe('Project 1');
    });

    const req = httpMock.expectOne('../../../../assets/json/projects.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjectsResponse);
  });
});
