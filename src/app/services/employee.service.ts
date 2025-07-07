import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

baseUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  createEmp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createEmp`, data);
  }

  getEmp(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}getEmp`,{});
  }

  getCountry(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}getCountryDD`,{});
  }

  getEmploymentTypes(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}getemptypesDD`,{});
  }
  getStates(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}getStateDD`, data);
  }
  getCities(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}getCityDD`, data);
  }

  updateEmp(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}updateEmp`, data);
  }

  deleteEmp(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteEmp`,id);
  }
}
