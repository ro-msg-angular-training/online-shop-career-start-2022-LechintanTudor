export type UserRole = 'admin' | 'user' | 'customer';

export interface User {
  username: string;
  fullName: string;
  roles: UserRole[];
}

export interface Credentials {
  username: string;
  password: string;
}
