import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-add',

imports: [ CommonModule, FormsModule,NgSelectModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
personalDetails:any={}
  constructor(private employeeService: EmployeeService,public dataService: DataService) {
       this.countrydd();
      this.dataService.currentMessage.subscribe(msg => this.personalDetails = msg);
      console.log(this.personalDetails);
   }
 maritalStatusList = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Separated', label: 'Separated ' }
  ];
  genderList = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ]
 async ngOnInit()  {

  }
   countryList: any = [];
  employmentTypes: any[] = [];
  async countrydd() {
    this.countryList = [];
    this.employeeService.getCountry().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.countryList = data;
        console.log(this.countryList);
      } else if (data && data.status === false) {
        alert(data.message);
        return;
      } else if (data && data.data) {
        this.countryList = data.data;
        console.log(this.countryList);
      }
    });
  }
cities:any=[]
  async getcity(stateId: any) {
    this.cities = [];
    let obj: any = {}
    obj['id'] = stateId.value || stateId;
    if (obj) {
      // Implement the logic to fetch cities based on the selected state
      this.employeeService.getCities(obj).subscribe(data => {
        this.cities = data.data || [];
        console.log(this.cities);
      });
    }
  }
   states: any[] = [];
  async getstates(countryId: any) {
    this.states = []
    let obj: any = {}
    obj['id'] = countryId.value|| countryId;

    this.employeeService.getStates(obj).subscribe(data => {
      this.states = data.data || [];
      console.log(this.states);
    }

    );
  }
  toUppercase(){

  }
}
