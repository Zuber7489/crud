import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentValue!:FormGroup;

  studentObj:StudentModel = new StudentModel;
  
  studentList:any=[];

  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.studentValue = this.formbuilder.group({
      name:[''],
      class:[''],
      email:['']
    })
    this.getStudent();
  }

  AddStudent(){
this.studentObj.name = this.studentValue.value.name;
this.studentObj.class = this.studentValue.value.class;
this.studentObj.email = this.studentValue.value.email;
this.api.postStudent(this.studentObj).subscribe({next: (v)=>{
  console.log(v)
},error: (e)=>{
  console.log(e)
  alert('error')
},
complete: () =>{
  console.log('student record Added')
  alert('customer record Added')
  this.getStudent();
  this.studentValue.reset();
}

})


}
getStudent(){
 this.api.getStudent().subscribe(res=>{
  this.studentList = res;
 }) 
}

deleteStudent(data:any){
this.api.deleteStudent(data.id).subscribe({next: (v)=>{
  console.log(v)
},error: (e)=>{
  console.log(e)
  alert('error')
},
complete: () =>{
  console.log('student record deleted')
  alert('Student record deleted')
  this.getStudent();
  
}})
}
editStudent(data:any){
  this.studentValue.controls["name"].setValue(data.name);
  this.studentValue.controls["class"].setValue(data.class);
  this.studentValue.controls["email"].setValue(data.email);
this.studentObj.id=data.id;  
  }
  
  UpdateStudent(){
    this.studentObj.name = this.studentValue.value.name;
this.studentObj.class = this.studentValue.value.class;
this.studentObj.email = this.studentValue.value.email;
this.api.putStudent(this.studentObj,this.studentObj.id).subscribe({next: (v)=>{
  console.log(v)
},error: (e)=>{
  console.log(e)
  alert('error')
},
complete: () =>{
  console.log('student record updated')
  alert('customer record updated')
  this.getStudent();
  this.studentValue.reset();
}

})


  }

}
