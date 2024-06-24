import { Project } from 'src/app/core/interfaces/project.interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let mockedProjects: Project[];

  beforeEach(() => {
    pipe = new FilterPipe();

    mockedProjects = [
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
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter projects based on name', () => {
    const filteredProjects = pipe.transform(mockedProjects, 'Empresas');
    expect(filteredProjects.length).toBe(1);
    expect(filteredProjects[0].name).toBe('Empresas externas');
  });

  it('should return all projects if name is empty', () => {
    const filteredProjects = pipe.transform(mockedProjects, '');
    expect(filteredProjects.length).toBe(2);
  });

  it('should return an empty array if no projects match the name', () => {
    const filteredProjects = pipe.transform(mockedProjects, 'Inexistente');
    expect(filteredProjects.length).toBe(0);
  });

  it('should be case insensitive when filtering', () => {
    const filteredProjects = pipe.transform(mockedProjects, 'empresas externas');
    expect(filteredProjects.length).toBe(1);
    expect(filteredProjects[0].name).toBe('Empresas externas');
  });
});
