import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from 'app/shared/models/payment.model';
import { environment } from 'environments/environment';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { Observable } from 'rxjs';
import * as commonModels from '../../models/common.model';

@Injectable()
export class PaymentService {
  private API_PATH = environment.billingApiUrl;
  private ACTION_API_PATH = environment.actionApiUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getActionApiHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('action-api-authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getBillingApiHeaders() {
    return new HttpHeaders({
      'x-access-token': `${localStorage.getItem('billing-authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  load(): Observable<any> {
    return this.http.get<any>(this.API_PATH + `/payment`, {
      params: {},
      headers: this.getBillingApiHeaders(),
    });
  }

  loadBalance (): Observable<any> {
    const userId = this.localStorageService.getData('identification');
    return this.http.get<any>(this.ACTION_API_PATH + `/billing/getBalance?userId=${userId}`, {
      headers: this.getActionApiHeaders(),
    });
  }

  getBalance (userId): Observable<any> {
    return this.http.get<any>(this.ACTION_API_PATH + `/billing/getBalance?userId=${userId}`, {
      headers: this.getActionApiHeaders()
    });
  }

  updateBalance ({ payload }): Observable<any> {
    return this.http.post<any>(this.ACTION_API_PATH + `/billing/addBalance?userId=${payload.userId}&amount=${payload.amount}`, {},{
      headers: this.getActionApiHeaders()
    });
  }

  getPricing (userId): Observable<any> {
    return this.http.get<any>(this.ACTION_API_PATH + `/billing/getPricing?userId=${userId}`, {
      headers: this.getActionApiHeaders()
    });
  }

  updatePricing ({ payload }): Observable<any> {
    return this.http.post<any>(this.ACTION_API_PATH + `/billing/setPricing`, payload, {
      headers: this.getActionApiHeaders()
    });
  }

  create(payload: PaymentModel): Observable<any> {
    return this.http.post<any>(this.API_PATH + `/payment`, payload, {
      headers: this.getBillingApiHeaders(),
    });
  }

  getList(payload: commonModels.Filter): Observable<any> {
    let paramObj = {
      order_by: payload.order_by,
      order_dir: payload.order_dir,
      page: payload.page.toString(),
      per_page: payload.per_page.toString(),
    };
    if (payload.search.trim()) {
      paramObj = Object.assign(paramObj, { search: payload.search });
    }

    return this.http.get<any>(this.API_PATH + `/payment`, {
      params: paramObj,
      headers: this.getBillingApiHeaders(),
    });
  }
}
