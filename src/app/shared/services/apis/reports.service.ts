import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as reportsModels from 'app/shared/models/reports.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ReportsService {
  private API_PATH = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthService
  ) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
    });
  }

  getStatusList() {
    const paramObj = {
      user_id: this.authenticationService.getApiIdentification(),
    };
    return this.http.get<any>(this.API_PATH + `/report_status`, {
      params: paramObj,
      headers: this.getHttpHeaders(),
    });
  }

  getLeadReport(filter: reportsModels.Filter): Observable<any> {
    const paramObj = {
      user_id: this.authenticationService.getApiIdentification(),
      start_date: filter.start_date,
      end_date: filter.end_date,
      filter: JSON.stringify(filter.filter),
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    return this.http.post<any>(this.API_PATH + `/reports/lead`, paramObj, {
      headers: this.getHttpHeaders(),
    });
  }

  exportLeadReport(filter: reportsModels.Filter): Observable<any> {
    const paramObj = {
      user_id: this.authenticationService.getApiIdentification(),
      start_date: filter.start_date,
      end_date: filter.end_date,
      filter: JSON.stringify(filter.filter),
    };
    return this.http.post<any>(
      this.API_PATH + `/reports/lead/export`,
      paramObj,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }
}
