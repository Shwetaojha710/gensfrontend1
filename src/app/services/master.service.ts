import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private baseUrl = environment.apiUrl || 'http://192.168.23.11:3001/api/';

  constructor(private http: HttpClient) { }

  // getDepartments(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/departments`);
  // }

  getDesignations(): Observable<any> {
    return this.http.post(`${this.baseUrl}getDesignations`, {});
  }
  getEmploymentTypes(): Observable<any> {
    return this.http.post(`${this.baseUrl}employment-types`, {});
  }
  addDepartment(dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createDepartment`, dept);
  }

  updateDepartment(id: any, dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}updateDepartment`, dept);
  }
  getDepartments(): Observable<any> {
    return this.http.post(`${this.baseUrl}getDepartments`, {});
  }
  //  Departmentsdd(): Observable<any> {
  //   return this.http.post(`${this.baseUrl}department-dd`, {});
  // }

  Departmentsdd(): Observable<any> {
    return this.http.post(`${this.baseUrl}department-dd`, {});
  }
  // deleteDepartment(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/delete-department`,id);
  // }
  deleteDepartment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteDepartment`, data);
  }
  deletedesignation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteDesignation`, data);
  }
  adddesignation(dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createDesignation`, dept);
  }
  updatedesignation(id: any, dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}updateDesignation`, dept);
  }



  getEmployee(): Observable<any> {
    return this.http.post(`${this.baseUrl}getEmpTypes`, {});
  }

  addEmployee(dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createEmpType`, dept);
  }

  updateEmployee(id: any, dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}editEmpType`, dept);
  }

  deleteEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteEmpType`, data);
  }
  getshifts(): Observable<any> {
    return this.http.post(`${this.baseUrl}getShift`, {});
  }

  createShift(dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createShift`, dept);
  }

  updateShift(id: any, dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}updateShift`, dept);
  }

  deleteShift(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteShift`, data);
  }



  getDocument(): Observable<any> {
    return this.http.post(`${this.baseUrl}getDocument`, {});
  }

  addDocument(dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createDocument`, dept);
  }

  updateDocument(id: any, dept: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}editDocument`, dept);
  }

  deleteDocument(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}deleteDocument`, data);
  }

   getDocumentDD(): Observable<any> {
    return this.http.post(`${this.baseUrl}getDocumentDD`, {});
  }


}
