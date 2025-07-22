import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';
import { MasterService } from '../../services/master.service';
import { StatusService } from '../../services/status.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-logs',
    imports: [FormsModule, CommonModule, NgSelectModule,],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})

export class LogsComponent {
  obj: any = {}
  notyf: Notyf;
monthList = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

  back() {
    this.obj = {}
    this.createFlag = false

  }
  dayList: string[] = [];

 generateDayList(month: number, year: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  this.dayList = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
}
  status: any = [{ value: 'active', label: 'ACTIVE' }, { value: 'inactive', label: 'INACTIVE' }]

  // onSubmit() {
  //    console.log(this.obj)
  // }
  AttendanceMasterList:any = [];
  editingId: number | null = null;

  constructor(
    private master: MasterService,
    private attendanceService:AttendanceService,
    public statusService: StatusService,
    private router: Router,
  ) {


    this.notyf = new Notyf();
  }
yearList:any = [];
EmpList:any=[]
AttendanceList:any=[]
  async ngOnInit() {

    await this.fetchSalaryMaster();
      const currentYear = new Date().getFullYear();
  for (let year = 2020; year <= currentYear + 5; year++) {
    this.yearList.push({ value: year.toString(), label: year.toString() });
  }
  console.log(this.yearList,"year list");

  await this.empList();

  }

  fetchAttendance(){
    this.AttendanceList = []

  this.attendanceService.getattendancelist(this.obj).subscribe((response: any) => {
      if (response && response.data && response.status === true) {
        this.notyf.success(response.message || 'Employees loaded successfully');
        this.AttendanceMasterList = [];
        this.AttendanceMasterList = response.data || [];
         this.generateDayList(this.obj['month'], this.obj['year']);
      } else if (response.status === false) {
        this.notyf.error(response.message)
      }
      else if (response.status == 'expired') {
        this.router.navigate(['login'])
      }
    },
      (error: any) => {
        console.error('Error loading employees:', error);
        this.notyf.error(error)
        // alert('Failed to load employees. Please try again.');
      }
    );

  }

  async empList(){
     this.EmpList = []
    this.master.getemployeeList().subscribe(data => {
      console.log(data)
      if (data['status'] == true) {
        this.notyf.success(data['message']);
        this.EmpList = data.data;
        console.log(this.EmpList,"attendance master list");

      } else {
        this.notyf.error(data['message']);
      }
    });

  }
  getStatusClass(status: any): string {
    switch (status) {
      case 'pending': return 'bg-light-warning';
      case 'cancelled': return 'bg-light-danger';
      case 'completed': return 'bg-light-success';
      default: return 'bg-light-secondary';
    }
  }

  async fetchSalaryMaster() {
    this.AttendanceMasterList = []
    this.master.getAttendanceSetting().subscribe(data => {
      console.log(data)
      if (data['status'] == true) {
        this.notyf.success(data['message']);
        this.AttendanceMasterList = data.data;
        console.log(this.AttendanceMasterList,"attendance master list");

      } else {
        this.notyf.error(data['message']);
      }
    });


  }
  validateField(value: any, fieldName: string): boolean {
    if (!value || value.toString().trim() === '') {
      this.notyf.error(`Please enter a valid ${fieldName}`);
      return false;
    }
    return true;
  }
  onSubmit() {

  if (
      !this.validateField( this.obj.graceMinutes, 'Grace Minute') ||
      !this.validateField(this.obj.lateAllowanceMin, 'Allowed late') ||
      !this.validateField(this.obj.halfDayThreshold, 'final late timing') ||
      !this.validateField(this.obj.halfdayToAbsentMin, 'Half Day to Absent Minute')
    ) {
      return;
    }

    this.master.addSalaryMaster(this.obj).subscribe({
      next: (response: any) => {
        console.log('response', response);

        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);

        if (status === true) {

          this.notyf.success(message)
          this.fetchSalaryMaster();
          this.resetForm();
        }
        else if (status === "expired") {
          this.router.navigate(["login"]);
        }

        else {
          this.notyf.error(message)
        }

      },
      error: (err) => {
        console.error('Error:', err);
        this.notyf.error(err.error?.message)
      }
    });

  }

  update(dept: any) {
    this.obj = Object.assign({}, dept)
    this.editingId = this.obj.id;
    this.createFlag = true
    this.updateFlag = true
  }
  updatedata() {
    this.master.updateSalaryMaster(this.editingId, this.obj).subscribe({
      next: (response: any) => {
        console.log('response', response);
        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);
        if (status === true) {
          this.notyf.success(message)
          this.fetchSalaryMaster();
          this.resetForm();
        }
        else if (status === "expired") {
          this.router.navigate(["login"]);
        }
        else {
          this.notyf.error(message)
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.notyf.error(err.error.message)
      }



    })

  }

  delete(data: number) {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you Want to Delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSalaryMaster(data)
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire({
        //   title: "Cancelled",
        //   text: "Your imaginary file is safe :)",
        //   icon: "error"
        // });
      }
    });



  }
  deleteSalaryMaster(data: any) {
    this.master.deleteSalaryMaster(data).subscribe({
      next: (response: any) => {
        console.log('response', response);
        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);
        if (status === true) {
          this.notyf.success(message)
          this.fetchSalaryMaster();
        }
        else if (status === "expired") {
          this.router.navigate(["login"]);
        }
        else {
          this.notyf.error(message)
        }
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.notyf.error(err.error.message)
      }

    })
  }

  resetForm() {
    this.createFlag = false
    this.obj = {}
    this.editingId = null;
  }
  isInvalid(field: string): any {
    // const control = this.EmployeeForm.get(field);
    // return !!(control && control.touched && control.invalid);
  }

  createFlag: any = false
  listflag: any = true
  updateFlag: any = false
  opencreate() {
    this.obj = {}
    this.createFlag = true
    this.listflag = false
    this.updateFlag = false
  }




}

