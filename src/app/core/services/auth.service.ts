import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest
} from '../../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'dineup_token';

  constructor(private http: HttpClient, private router: Router) {}

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}/register`, request)
      .pipe(tap(res => this.storeToken(res.token)));
  }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(tap(res => this.storeToken(res.token)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  // Decode the JWT payload
  getDecodedToken(): any {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();
    
    // Spring Security puts roles in the 'scope' claim for OAuth2 resource server
    return decoded?.scope ?? decoded?.role ?? null;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role?.includes('ROLE_ADMIN') ?? false;
  }

  isCustomer(): boolean {
    const role = this.getRole();
    return role?.includes('ROLE_CUSTOMER') ?? false;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT exp is in seconds, Date.now() is in milliseconds
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}