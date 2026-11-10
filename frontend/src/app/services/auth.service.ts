import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthUser { id: string; name: string; email: string; role: 'admin'|'teacher'|'student'; }
interface AuthResponse { token: string; user: AuthUser; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/signup`, { name, email, password })
      .pipe(tap(response => this.saveSession(response)));
  }
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, { email, password })
      .pipe(tap(response => this.saveSession(response)));
  }
  private saveSession(response: AuthResponse): void {
    localStorage.setItem('eduSphereToken', response.token);
    localStorage.setItem('eduSphereUser', JSON.stringify(response.user));
  }
  getToken(): string | null { return localStorage.getItem('eduSphereToken'); }
  getCurrentUser(): AuthUser | null {
    const raw=localStorage.getItem('eduSphereUser');
    try { return raw ? JSON.parse(raw) as AuthUser : null; } catch { return null; }
  }
  isLoggedIn(): boolean { return !!this.getToken(); }
  logout(): void { localStorage.removeItem('eduSphereToken'); localStorage.removeItem('eduSphereUser'); }
}
