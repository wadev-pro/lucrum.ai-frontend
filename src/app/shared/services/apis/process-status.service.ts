import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class ProcessStatusService {
  private API_PATH = environment.actionApiUrl + '/campaign-manager';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getActionApiHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('action-api-authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getList(): Observable<any> {
    return this.http.get<any>(
      this.API_PATH + '/getAllCampaignProcessingStatuses',
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
