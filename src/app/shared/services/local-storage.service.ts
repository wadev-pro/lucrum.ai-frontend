import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class LocalStorageService {
  storeAuthInfo(userInfo: any) {}
  loadUserInfo(): Observable<any> {
    return of({});
  }

  storeActionApiAuthorization(authorization: string) {
    localStorage.setItem('action-api-authorization', authorization);
  }
  storeBillingAuthorization(authorization: string) {
    localStorage.setItem('billing-authorization', authorization);
  }

  storeAuthorization(authorization: string) {
    localStorage.setItem('authorization', authorization);
  }

  storeEmulationAuthorization(authorization: string) {
    localStorage.setItem('authorization', authorization);
    localStorage.setItem('isEmulating', 'true');
  }

  isEmulating () {
    const emulation = localStorage.getItem('isEmulating');
    return emulation ? JSON.parse(emulation) : false;
  }

  loadSessionToken(): Observable<string> {
    return of(localStorage.getItem('sessionToken'));
  }

  getBillingAuthorization() {
    return localStorage.getItem('billing-authorization');
  }

  getActionApiAuthorization() {
    return localStorage.getItem('action-api-authorization');
  }

  setData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

  resetSession(): any {}
}
