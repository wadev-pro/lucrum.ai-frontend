import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { getUniqFileName } from 'app/shared/helpers/utils';
import * as campaignModels from 'app/shared/models/campaign.model';
import { ComposeModel } from 'app/shared/models/campaign.model';
import * as commonModels from 'app/shared/models/common.model';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class CampaignService {
  private API_PATH = environment.apiUrl + '/campaign';
  private ACTION_API_PATH = environment.actionApiUrl + '/campaign-manager';
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

  getList(requestParams: campaignModels.CampaignFilter): Observable<any> {
    let paramObj = {
      start_date: requestParams.start_date,
      end_date: requestParams.end_date,
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
    };
    if (requestParams.search.trim()) {
      paramObj = Object.assign(paramObj, { search: requestParams.search });
    }

    return this.http.post<any>(this.API_PATH, paramObj, {
      headers: this.getHttpHeaders(),
    });
  }

  getStatistics(campaign_ids: Array<string>): Observable<any> {
    const paramObj = {
      campaign_ids: campaign_ids,
    };

    return this.http.post<any>(this.API_PATH + '/statistics', paramObj, {
      headers: this.getHttpHeaders(),
    });
  }

  getDetail(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(this.ACTION_API_PATH + '/getCampaignById', {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getDetailDb(campaign_id: string): Observable<any> {
    return this.http.get<any>(this.API_PATH + `/${campaign_id}`, {
      headers: this.getHttpHeaders(),
    });
  }

  getEventHistory(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getCampaignHistoryEventsById',
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  getMessageCount(campaing_id: string): Observable<any> {
    return this.http.get<any>(
      this.API_PATH + `/${campaing_id}/statistics/message_count`,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getCarrierStatistics(
    campaing_id: string,
    filter: commonModels.Filter
  ): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/carriers`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getDidStatistics(
    campaing_id: string,
    filter: commonModels.Filter
  ): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/dids`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getMessageTemplate(
    campaing_id: string,
    filter: commonModels.Filter
  ): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/message_template`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getTld(campaing_id: string, filter: commonModels.Filter): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/tlds`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  uploadCampaignFile(file: File): Observable<any> {
    const formData = new FormData();
    const newFileName = getUniqFileName(file);
    formData.append('file', file, newFileName);

    return this.http.post<any>(
      this.ACTION_API_PATH + `/uploadCampaignFile`,
      formData, {
        headers: new HttpHeaders({
          Authorization: `${localStorage.getItem('action-api-authorization')}`,
          Accept: 'application/json',
        })
      }
    );
  }

  composeCampaign(requestParams: ComposeModel): Observable<any> {
    return this.http.post<any>(
      this.ACTION_API_PATH + `/composeCampaign`,
      requestParams,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  updateCampaign(
    campaign_id: string,
    requestParams: ComposeModel
  ): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
      ...requestParams,
    };
    return this.http.post<any>(
      this.ACTION_API_PATH + `/editCampaign`,
      paramObj,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  startCampaign(campaign_id: string, requestParams: object): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
      ...requestParams,
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/startCampaign`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  stopCampaign(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/stopCampaign`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  markCampaignStopped(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/markCampaignAsStopped`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  testCampaign(campaign_id: string, requestParams: object): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
      ...requestParams,
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/testCampaign`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  checkCampaign(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + `/reRunQualityCheckProcess`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  stopCheckCampaign(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + `/deleteCampaignQualityCheckJob`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  deleteCampaignJob(campaign_id: string): Observable<any> {
    const paramObj = {
      campaignId: campaign_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + `/deleteCampaignExecutorJob`,
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  getMessageSent(
    campaing_id: string,
    filter: commonModels.Filter
  ): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/sms_report`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getClick(campaing_id: string, filter: commonModels.Filter): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/click_report`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }

  getConversion(
    campaing_id: string,
    filter: commonModels.Filter
  ): Observable<any> {
    let paramObj = {
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(
      this.API_PATH + `/${campaing_id}/statistics/conversion_report`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }
}
