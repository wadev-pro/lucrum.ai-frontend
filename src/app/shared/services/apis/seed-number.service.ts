import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import { SeedNumber } from 'app/shared/models/seed-number.model';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class SeedNumberService {
  private API_PATH = environment.apiUrl + '/seed-numbers';
  private ACTION_API_PATH = environment.actionApiUrl + '/seed-numbers';
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

  getList(): Observable<any> {
    const paramObj = {
      userId: this.authenticationService$.getApiIdentification(),
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/getAllSeedNumbers`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getByNumber(number: string): Observable<any> {
    const paramObj = {
      userId: this.authenticationService$.getApiIdentification(),
      phoneNumber: number,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getSeedNumberByPhoneNumber',
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  create(payload: SeedNumber): Observable<any> {
    const paramObj = {
      userId: this.authenticationService$.getApiIdentification(),
      seedNumber: payload.seedNumber,
    };
    return this.http.post<any>(
      this.ACTION_API_PATH + `/createSeedNumber`,
      paramObj,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  delete(number: string): Observable<any> {
    const paramObj = {
      userId: this.authenticationService$.getApiIdentification(),
      phoneNumber: number,
    };
    return this.http.delete<any>(
      this.ACTION_API_PATH + `/deleteSeedNumberByPhoneNumber`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
