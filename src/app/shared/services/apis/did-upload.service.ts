import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DidUploadFileModel } from 'app/shared/models/dids.model';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class DidUploadService {
  private API_PATH = environment.apiUrl + '/did-upload-managers';
  private ACTION_API_PATH = environment.actionApiUrl + '/did-upload-managers';
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

  getUploadStatus(did_pool_id: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH +
        '/getDidUploadManagerByDidPoolId?didPoolId=' +
        did_pool_id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.ACTION_API_PATH + '/uploadFile', formData, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('action-api-authorization')}`,
        Accept: 'application/json',
      })
    });
  }

  uploadDids(requestParam: DidUploadFileModel): Observable<any> {
    const formData = new FormData();
    formData.append('DidPoolId', requestParam.DidPoolId);
    formData.append(
      'MessageGatewayProviderId',
      requestParam.MessageGatewayProviderId
    );
    formData.append('FileName', requestParam.FileName);

    return this.http.post<any>(this.ACTION_API_PATH + '/uploadDids', formData, {
      headers: new HttpHeaders({
        Authorization: `${localStorage.getItem('action-api-authorization')}`,
        Accept: 'application/json',
      })
    });
  }

  getAllUploaderStatus(): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getAllUploaderStatuses',
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
