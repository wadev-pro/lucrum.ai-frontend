import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import * as statisticsModels from 'app/shared/models/statistics.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StatisticsService {
  private API_PATH = environment.apiUrl + '/statistics';
  private ACTION_API_MESSAGE_TEMPLATE_PATH =
    environment.actionApiUrl + '/message-template-groups';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthService
  ) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
    });
  }

  getTldStatistics(filter: statisticsModels.TldFilter): Observable<any> {
    const level = filter.levels.length - 1;
    const levelFilter = level > 0 ? filter.levels[level] : null;
    let paramObj = {
      start_date: filter.start_date,
      end_date: filter.end_date,
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
      level: level,
      filter: levelFilter
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(this.API_PATH + `/tld`, paramObj, {
      headers: this.getHttpHeaders(),
    });
  }

  getTemplateGroupStatistics(
    filter: statisticsModels.TemplateGrouplStatisticsFilter
  ): Observable<any> {
    let paramObj = {
      group_id: filter.group_id,
      start_date: filter.start_date,
      end_date: filter.end_date,
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };
    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.post<any>(this.API_PATH + `/template_group`, paramObj, {
      headers: this.getHttpHeaders(),
    });
  }
}
