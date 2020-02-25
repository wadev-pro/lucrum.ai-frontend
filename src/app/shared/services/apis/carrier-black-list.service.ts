import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class CarrierBlackListService {
  private API_PATH = environment.apiUrl + '/carrier-blacklist';
  private ACTION_API_PATH = environment.actionApiUrl + '/carrier-blacklist';
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

  getByCampaignId(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + `/getCarrierBlacklistByCampaignId`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  update(campaign_id: string, payload: object): Observable<any> {
    return this.http.put<any>(
      this.ACTION_API_PATH +
        `/updateCarrierBlacklist?campaignId=` +
        campaign_id,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  delete(campaign_id: string, carrier_name: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
      carrierName: carrier_name,
    };
    return this.http.delete<any>(
      this.ACTION_API_PATH + `/removeCarrierFromBlacklist`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
