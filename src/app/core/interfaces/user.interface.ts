export interface User {
  name: string;
  username: string;
  password: string;
  roles: string[];
}

export interface UsersResponse {
  users: User[];
}