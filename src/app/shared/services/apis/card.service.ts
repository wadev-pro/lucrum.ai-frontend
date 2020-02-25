import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardModel } from 'app/shared/models/card.model';
import { environment } from 'environments/environment';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class CardService {
  private API_PATH = environment.billingApiUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getBillingApiHeaders() {
    return new HttpHeaders({
      'x-access-token': `${localStorage.getItem('billing-authorization')}`,
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

  load(): Observable<any> {
    return this.http.get<any>(this.API_PATH + `/cards`, {
      params: {},
      headers: this.getBillingApiHeaders(),
    });
  }

  create(payload: CardModel): Observable<any> {
    return this.http.post<any>(this.API_PATH + `/card`, payload, {
      headers: this.getBillingApiHeaders(),
    });
  }
}
