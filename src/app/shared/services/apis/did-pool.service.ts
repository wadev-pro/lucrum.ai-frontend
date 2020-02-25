import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DidPoolRequest } from 'app/shared/models/did-pool.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class DidPoolService {
  private API_PATH = environment.apiUrl + '/did-pool';
  private ACTION_API_PATH = environment.actionApiUrl + '/did-pool';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthService,
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
      skipRecordsCount: '0',
      maxRecordsCount: '10000',
      userId: this.authenticationService.getApiIdentification(),
    };
    return this.http.get<any>(this.ACTION_API_PATH + '/getAllDidPools', {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getDidPoolById?didPoolId=' + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  create(payload: DidPoolRequest): Observable<any> {
    return this.http.post<any>(
      this.ACTION_API_PATH + `/createDidPool`,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  update(payload: DidPoolRequest): Observable<any> {
    return this.http.put<any>(
      this.ACTION_API_PATH + `/editDidPool?didPoolId=` + payload.id,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
