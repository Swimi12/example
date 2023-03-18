import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IAutorizationRequestData, IAutorizationResponse } from '../types/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(data: IAutorizationRequestData) {
    return this.http
      .post<IAutorizationResponse>(
        `http://localhost:3000/api/users/authorization`,
        data
      )
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isAuthentificated(): boolean {
    return !!this.token;
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('expiresIn')!);
    if (new Date() > expDate) {
      this.logout();
    }
    return localStorage.getItem('token')!;
  }

  private setToken(response: IAutorizationResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
