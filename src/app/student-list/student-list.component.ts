import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  studentArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  students: Observable<Student[]>;
  student: Student = new Student();
  deteleMessage = false;
  studentlist: any;
  isupdated: false;

  ngOnInit(): void {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu:[[6,16,20,-1], [6,16,20,"All"]],
      processing: true
    };
    this.studentService.getStudentList().subscribe(data =>{
      this.students = data;
      this.dtTrigger.next();
    })
  }

  deleteStudent(id: number){
    this.studentService.deleteStudent(id).subscribe(
      data => {
        console.log(data);
        this.deteleMessage = true;
        this.studentService.getStudentList().subscribe(data =>{
          this.students=data
        })
      },
      error => console.log(error)  
    );
  }

  updateStudent(id: number){
    this.studentService.getStudent(id).subscribe(
      data => {
        this.studentlist=data
      },
      error => console.log(error)
    );
  }

  studentupdateform=new FormGroup({  
    student_id:new FormControl(),  
    student_name:new FormControl(),  
    student_email:new FormControl(),  
    student_branch:new FormControl()  
  }); 

  updateStu(updstu){  
    this.student=new Student();   
   this.student.student_id=this.StudentId?.value;  
   this.student.student_name=this.StudentName?.value;  
   this.student.student_email=this.StudentEmail?.value;  
   this.student.student_branch=this.StudentBranch?.value;  
   console.log(this.StudentBranch?.value);  
     
  
   this.studentService.updateStudent(this.student.student_id,this.student).subscribe(  
    data => {       
      this.isupdated=false;  
      this.studentService.getStudentList().subscribe(data =>{  
        this.students =data  
        })  
    },  
    error => console.log(error));  
  }  
  
  get StudentName(){  
    return this.studentupdateform.get('student_name');  
  }  
  
  get StudentEmail(){  
    return this.studentupdateform.get('student_email');  
  }  
  
  get StudentBranch(){  
    return this.studentupdateform.get('student_branch');  
  }  
  
  get StudentId(){  
    return this.studentupdateform.get('student_id');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
}  


