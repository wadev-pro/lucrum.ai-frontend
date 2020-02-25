import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class MessageTemplateService {
  private API_PATH = environment.apiUrl + '/message-templates';
  private ACTION_API_PATH = environment.actionApiUrl + '/message-templates';
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

  getList(): Observable<any> {
    const paramObj = {
      userId: this.authenticationService.getApiIdentification(),
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/getAllTemplates`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getById(template_id: string): Observable<any> {
    const paramObj = {
      id: template_id,
    };
    return this.http.get<any>(this.ACTION_API_PATH + '/getTemplateById', {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  create(payload: MessageTemplate): Observable<any> {
    return this.http.post<any>(
      this.ACTION_API_PATH + `/createTemplate`,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  update(payload: MessageTemplate): Observable<any> {
    return this.http.put<any>(
      this.ACTION_API_PATH + `/editTemplate?id=` + payload.templateId,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(
      this.ACTION_API_PATH + `/deleteTemplateById?id=` + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  previewRawContent(content: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + `/previewRawContent?content=${content}`,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
