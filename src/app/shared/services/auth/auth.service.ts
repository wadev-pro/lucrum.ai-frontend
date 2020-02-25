import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Profile, UpdateUser } from 'app/shared/models/user.model';

@Injectable()
export class AuthService {
  private API_PATH = environment.apiUrl + '/auth';
  private ACTION_API_PATH = environment.actionApiUrl;
  private BILLING_API_PATH = environment.billingApiUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('authorization');
  }

  getApiIdentification(): string {
    return localStorage.getItem('identification');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getApiIdentification();
  }

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
    });
  }

  getActionApiAuthorization () {
    return this.http.post(`${this.ACTION_API_PATH}/auth/login`, {
      email: environment.actionApiUser,
      password: environment.actionApiPassword
    }, { responseType: 'text'});
  }

  getBillingAuthorization () {
    return this.http.post<any>(`${this.BILLING_API_PATH}/authenticate`, {
      user: localStorage.getItem('identification')
    }, {
      headers: this.getHttpHeaders()
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_PATH}/login`, {
      email,
      password,
    });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_PATH}/logout`, {
      headers: this.getHttpHeaders(),
    });
  }

  emulate(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_PATH}/emulate`, { id }, {headers: this.getHttpHeaders()});
  }

  getUserInfo(): Observable<Profile> {
    return this.http.get<any>(`${this.API_PATH}/user`, {
      headers: this.getHttpHeaders(),
    });
  }

  updateUserInfo(payload: UpdateUser): Observable<Profile> {
    return this.http.put<any>(`${this.API_PATH}/user`, payload, {
      headers: this.getHttpHeaders(),
    });
  }
}
