import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  private API_PATH = environment.apiUrl + '/dashboard';
  constructor(private http: HttpClient) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
    });
  }

  getStatistics(start_date: string, end_date: string): Observable<any> {
    const paramObj = {
      start_date: start_date,
      end_date: end_date,
    };
    return this.http.post<any>(this.API_PATH + '/statistics', paramObj, {
      headers: this.getHttpHeaders(),
    });
  }
}
