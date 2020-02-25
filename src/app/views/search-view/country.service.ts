import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries(name) {
    return this.http.get<any[]>(
      'https://restcountries.eu/rest/v2/name/' + name
    );
  }
}
