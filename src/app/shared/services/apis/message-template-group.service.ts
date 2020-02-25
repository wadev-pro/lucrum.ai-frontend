import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import * as commonModels from 'app/shared/models/common.model';
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class MessageTemplateGroupService {
  private API_PATH = environment.apiUrl + '/message-template-groups';
  private ACTION_API_PATH =
    environment.actionApiUrl + '/message-template-groups';
  constructor(
    private http: HttpClient,
    private authenticationService$: AuthService,
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
      userId: this.authenticationService$.getApiIdentification(),
    };
    return this.http.get<any>(this.ACTION_API_PATH + `/getAllTemplateGroups`, {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getById(template_group_id: string): Observable<any> {
    const paramObj = {
      id: template_group_id,
    };
    return this.http.get<any>(this.ACTION_API_PATH + '/getTemplateGroupById', {
      params: paramObj,
      headers: this.getActionApiHeaders(),
    });
  }

  getAllTemplatePreviewsById(template_group_id: string): Observable<any> {
    const paramObj = {
      messageTemplateGroupId: template_group_id,
    };
    return this.http.get<any>(
      this.ACTION_API_PATH + '/previewAllMessageTemplatesByGroupId',
      {
        params: paramObj,
        headers: this.getActionApiHeaders(),
      }
    );
  }

  create(payload: MessageTemplateGroup): Observable<any> {
    return this.http.post<any>(
      this.ACTION_API_PATH + `/CreateTemplateGroup`,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  update(payload: MessageTemplateGroup): Observable<any> {
    return this.http.put<any>(
      this.ACTION_API_PATH + `/editTemplateGroup?id=` + payload.groupId,
      payload,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(
      this.ACTION_API_PATH + `/deleteTemplateGroupById?id=` + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
