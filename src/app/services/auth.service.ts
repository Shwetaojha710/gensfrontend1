import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseurl = 'http://192.168.23.11:3001/api/';
  loginUser(object: any): Observable<any> {
    return this.http.post(`${this.baseurl}login`, object, {
      withCredentials: true,
      responseType: 'text',
    });
  }
}
