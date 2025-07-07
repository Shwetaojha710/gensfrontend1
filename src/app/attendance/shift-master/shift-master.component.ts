import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';
import { MasterService } from '../../services/master.service';
import { StatusService } from '../../services/status.service';
import { ValidationUtil } from '../../shared/utils/validation.util';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-shift-master',
  imports: [NgSelectModule,
    FormsModule, CommonModule],
  templateUrl: './shift-master.component.html',
  styleUrl: './shift-master.component.css'
})
export class ShiftMasterComponent {
  obj: any = {}
  notyf: Notyf;

  back() {
    this.obj = {}
    this.createFlag = false

  }
  status: any = [{ value: 'Day', label: 'Day' }, { value: 'Night', label: 'Night' }]

  // onSubmit() {
  //    console.log(this.obj)
  // }
  departmentForm!: FormGroup;
  shiftList = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private shiftService: MasterService,
    public statusService: StatusService,
    private router: Router,
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', [Validators.required]]
    });

    this.notyf = new Notyf();
  }

  async ngOnInit() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    await this.fetchshifts();
  }
  getStatusClass(status: any): string {
    switch (status) {
      case 'pending': return 'bg-light-warning';
      case 'cancelled': return 'bg-light-danger';
      case 'completed': return 'bg-light-success';
      default: return 'bg-light-secondary';
    }
  }

  async fetchshifts() {
    this.shiftList = []
    this.shiftService.getshifts().subscribe(data => {
      if (data['status'] == true) {
        this.shiftList = []
        this.notyf.success(data['message']);
        this.shiftList = data.data;
      } else {
        this.notyf.error(data['message']);
      }
    });


  }

  onSubmit() {
    if (!ValidationUtil.showRequiredError('Shift Type', this.obj.shift, this.notyf)) {
      return;
    }

    if (!ValidationUtil.showRequiredError('Start Time', this.obj.startTime, this.notyf)) {
      return;
    }

    if (!ValidationUtil.showRequiredError('End Time', this.obj.endTime, this.notyf)) {
      return;
    }

    this.shiftService.createShift(this.obj).subscribe({
      next: (response: any) => {
        console.log('response', response);

        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);

        if (status === true) {

          this.notyf.success(message)
          this.fetchshifts();
          this.resetForm();
        }
        else if (status === "expired") {
          this.router.navigate(["/login"]);
        }

        else {
          this.notyf.error(message)
        }

      },
      error: (err) => {
        console.error('Error:', err);
        this.notyf.error(err)
      }
    });

  }
  convertTo24Hour(time12h: string): string {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');
    let hh = parseInt(hours, 10);

    if (modifier === 'PM' && hh < 12) {
      hh += 12;
    }
    if (modifier === 'AM' && hh === 12) {
      hh = 0;
    }

    return `${hh.toString().padStart(2, '0')}:${minutes}`;
  }
  update(dept: any) {
    this.obj = Object.assign({}, dept)
    this.editingId = this.obj.id;
    this.obj.startTime = this.convertTo24Hour(this.obj.startTime); // from "11:49 AM" to "11:49"
    this.obj.endTime = this.convertTo24Hour(this.obj.endTime);
    this.createFlag = true
    this.updateFlag = true
  }
  updatedata() {
    let newObj: any = {}
    newObj['startTime'] = this.obj.startTime
    newObj['endTime'] = this.obj.endTime
    this.shiftService.updateShift(this.editingId, newObj).subscribe({
      next: (response: any) => {
        console.log('response', response);
        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);
        if (status === true) {
          this.notyf.success(message)
          this.fetchshifts();
          this.resetForm();
        }
        else if (status === "expired") {
          this.router.navigate(["/login"]);
        }
        else {
          this.notyf.error(message)
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.notyf.error(err)
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
        this.deleteshift(data)
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
  deleteshift(data: any) {
    this.shiftService.deleteShift(data).subscribe({
      next: (response: any) => {
        console.log('response', response);
        let message = response.message ? response.message : 'Data found Successfully';
        let status = this.statusService.handleResponseStatus(response.status, message);
        console.log(status)
        console.log("response", response);
        if (status === true) {
          this.notyf.success(message)
          this.fetchshifts(); ``
        }
        else if (status === "expired") {
          this.router.navigate(["/login"]);
        }
        else {
          this.notyf.error(message)
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.notyf.error(err.message)
      }

    })
  }

  resetForm() {
    this.createFlag = false
    this.obj = {}
    this.editingId = null;
  }
  isInvalid(field: string): boolean {
    const control = this.departmentForm.get(field);
    return !!(control && control.touched && control.invalid);
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
