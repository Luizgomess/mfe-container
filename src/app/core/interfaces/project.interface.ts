export interface Project {
  name: string;
  route: string;
  description: string;
  permissions: string[];
}

export interface ProjectsResponse {
  projects: Project[];
}
