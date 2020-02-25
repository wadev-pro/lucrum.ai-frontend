import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from 'app/shared/models/common.model';
import { DidFilter } from 'app/shared/models/dids.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Injectable()
export class DidsService {
  private API_PATH = environment.apiUrl + '/dids';
  private ACTION_API_PATH = environment.actionApiUrl + '/dids';
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

  getList(did_pool_id: string, filter: Filter): Observable<any> {
    let paramObj = {
      domain_pool_id: did_pool_id,
      order_by: filter.order_by,
      order_dir: filter.order_dir,
      page: filter.page.toString(),
      per_page: filter.per_page.toString(),
    };

    if (filter.search.trim()) {
      paramObj = Object.assign(paramObj, { search: filter.search });
    }
    return this.http.get<any>(this.API_PATH, {
      params: paramObj,
      headers: this.getHttpHeaders(),
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + '/getDidById?didId=' + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  activate(id: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + '/reactivateDidById?didId=' + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  deactivate(id: string): Observable<any> {
    return this.http.get<any>(
      this.ACTION_API_PATH + '/DeactivateDidById?didId=' + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(
      this.ACTION_API_PATH + '/deleteDidById?didId=' + id,
      {
        headers: this.getActionApiHeaders(),
      }
    );
  }
}
