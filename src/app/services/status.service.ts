import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  notyf: Notyf;

  constructor(private router: Router,) {
    this.notyf = new Notyf();
  }
  handleResponseStatus(status: any, successMessage?: any) {
    switch (status) {
      case true:
        if (successMessage) {
          this.notyf.success(successMessage)
        }
        return status
      case 'expired':
        this.notyf.error(successMessage);
        this.router.navigate(['login']);
        localStorage.clear();
        return status;
      case false:
        this.notyf.error(successMessage)
        return status;
      default:
        this.notyf.error(successMessage)
        return status
    }
  }
}
