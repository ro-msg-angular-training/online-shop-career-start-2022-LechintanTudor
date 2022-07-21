import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, UserRole } from '../data/user';
import { API_BASE_URL } from './common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${API_BASE_URL}/login`, { username, password })
      .pipe(tap((user) => (this.user = user)));
  }

  logout(): void {
    this.user = null;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  userHasRole(role: UserRole): boolean {
    return this.user?.roles.includes(role) ?? false;
  }
}
