import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

baseUrl=environment.apiUrl

  constructor(private http: HttpClient) {}
   createBasic(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createBasic`, data);
  }
    getBasics(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}getBasic`, data);
  }
     deleteBasic(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteBasic`, data);
  }
    updateBasic(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}updateBasic`, data);
  }



  createAllowance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createAllowance`, data);
  }

  getAllowance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}getAllowance`, data);
  }

  deleteAllowance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteAllowance`, data);
  }

  updateAllowance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}updateAllowance`, data);
  }

}
