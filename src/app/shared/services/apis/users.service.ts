import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import { User } from 'app/shared/models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private API_PATH = environment.apiUrl;
  private ACTION_API_PATH = environment.actionApiUrl;
  constructor(
    private http: HttpClient,
    private authenticationService$: AuthService
  ) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getList(requestParams: commonModels.Filter): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
    };
    if (requestParams.search.trim()) {
      paramObj = Object.assign(paramObj, { search: requestParams.search });
    }

    return this.http.get<any>(this.API_PATH + `/users`, {
      params: paramObj,
      headers: this.getHttpHeaders(),
    });
  }

  create(payload: User): Observable<any> {
    return this.http.post<any>(this.API_PATH + `/user`, payload, {
      headers: this.getHttpHeaders(),
    });
  }

  update(id: number, payload: User): Observable<any> {
    return this.http.put<any>(this.API_PATH + `/user/${id}`, payload, {
      headers: this.getHttpHeaders(),
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.API_PATH + `/user/${id}`, {
      headers: this.getHttpHeaders(),
    });
  }
}
