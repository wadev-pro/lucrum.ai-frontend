import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

import * as commonModels from 'app/shared/models/common.model';
import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessageGatewayProviderService {
  private API_PATH = environment.apiUrl + '/message-gateway-providers';
  private ACTION_API_PATH =
    environment.actionApiUrl + '/message-gateway-providers';
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
      skipRecordsCount: '0',
      maxRecordsCount: '100',
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + `/getAllMessageGatewayProviders`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  getById(id: string): Observable<any> {
    const paramObj = {
      messageGatewayProviderId: id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getMessageGatewayProviderById',
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
