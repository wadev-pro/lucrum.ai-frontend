import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class FileService {
  private API_PATH = environment.apiUrl + `/file`;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthService
  ) {}

  getHttpHeaders() {
    return new HttpHeaders({
      Authorization: `${localStorage.getItem('authorization')}`,
    });
  }

  getExportToken(report_id: string): Observable<any> {
    const paramObj = {
      user_id: this.authenticationService.getApiIdentification(),
      report_id: report_id,
    };
    return this.http.post<any>(this.API_PATH + `/export_token`, paramObj, {
      headers: this.getHttpHeaders(),
    });
  }

  exportFile(token: string) {
    window.open(this.API_PATH + `/export_report?token=${token}`, '_blank');
  }
}
