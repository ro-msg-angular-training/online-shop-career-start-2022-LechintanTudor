export type UserRole = 'admin' | 'user' | 'customer';

export interface User {
  username: string;
  fullName: string;
  roles: UserRole[];
}
