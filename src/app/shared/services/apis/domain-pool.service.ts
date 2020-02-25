import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as _ from 'underscore';
import { DomainPool } from 'app/shared/models/domain-pool.models';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

const MAX_DOMAIN_POOLS = '50000';

@Injectable()
export class DomainPoolService {
  private API_PATH = environment.apiUrl + '/domain-pools';
  private ACTION_API_PATH = environment.actionApiUrl + '/domain-pools';
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

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getList(campaign_id): Observable<any> {
    const paramObj = {
      skipRecordsCount: '0',
      maxRecordsCount: MAX_DOMAIN_POOLS,
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getAllDomainsByCampaignId',
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  patchDomains(campaign_id: string, data: Array<DomainPool>): Observable<any> {
    const payload = {
      campaignId: campaign_id,
      domains: data,
    };
    return this.http.put<any>(
      this.ACTION_API_PATH +
        '/editDomainsByCampaignId?campaignId=' +
        campaign_id,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  addDomains(campaign_id: string, data: Array<DomainPool>): Observable<any> {
    return from(
      this.getList(campaign_id).pipe(
        map(result => {
          let domains: Array<string> = _.map(
            result.domains,
            item => item.domain
          );
          const new_domains: Array<string> = _.map(data, item => item.domain);
          domains = domains.concat(new_domains);
          return {
            campaignId: campaign_id,
            domains: domains,
          };
        }),
        switchMap(payload => {
          return this.http.put<any>(
            this.ACTION_API_PATH +
              '/editDomainsByCampaignId?campaignId=' +
              campaign_id,
            payload,
            {
              headers: this.getActionApiHeaders(),
            }
          );
        })
      )
    );
  }

  editDomain(
    campaign_id: string,
    index: number,
    data: DomainPool
  ): Observable<any> {
    return from(
      this.getList(campaign_id).pipe(
        map(result => {
          const domains: Array<string> = _.map(
            result.domains,
            item => item.domain
          );
          domains[index - 1] = data.domain;
          return {
            campaignId: campaign_id,
            domains: domains,
          };
        }),
        switchMap(payload => {
          return this.http.put<any>(
            this.ACTION_API_PATH +
              '/editDomainsByCampaignId?campaignId=' +
              campaign_id,
            payload,
            {
              headers: this.getHttpHeaders(),
            }
          );
        })
      )
    );
  }

  deleteDomains(campaign_id: string, id: number): Observable<any> {
    if (id) {
      return from(
        this.getList(campaign_id).pipe(
          map(result => {
            let domains: Array<any> = result.domains.slice(0);
            domains.splice(id - 1, 1);
            domains = _.map(domains, item => item.domain);
            return {
              campaignId: campaign_id,
              domains: domains,
            };
          }),
          switchMap(payload => {
            return this.http.put<any>(
              this.ACTION_API_PATH +
                '/editDomainsByCampaignId?campaignId=' +
                campaign_id,
              payload,
              {
                headers: this.getHttpHeaders(),
              }
            );
          })
        )
      );
    } else {
      return this.http.delete<any>(
        this.ACTION_API_PATH +
          '/deleteAllDomainsByCampaignId?campaignId=' +
          campaign_id,
        {
          headers: this.getHttpHeaders(),
        }
      );
    }
  }
}
