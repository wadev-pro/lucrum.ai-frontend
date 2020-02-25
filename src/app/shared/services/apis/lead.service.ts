import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class LeadService {
  private API_PATH = environment.apiUrl;
  private ACTION_API_PATH = environment.actionApiUrl;
  constructor(
    private http: HttpClient,
    private authenticationService$: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  getActionApiHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('action-api-authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  numberLookup(number: string): Observable<any> {
    const paramObj = {
      phoneNumber: number,
    };

    return this.http.get<any>(this.ACTION_API_PATH + `/lead/numberLookup`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getLeadInfo(number: string): Observable<any> {
    const paramObj = {
      phoneNumber: number,
    };

    return this.http.get<any>(
      this.ACTION_API_PATH + `/lead/getLeadInfoByPhoneNumber`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
