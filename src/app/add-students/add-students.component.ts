import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  student: Student = new Student();
  submitted = false;

  ngOnInit(): void {
    this.submitted = false;
  }

  studentsaveform = new FormGroup({
    student_name: new FormControl('',[Validators.required, Validators.minLength(50)]),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_branch: new FormControl()   
  });

  saveStudent(saveStudent){  
    this.student=new Student();     
    this.student.student_name=this.StudentName!.value;  
    this.student.student_email=this.StudentEmail!.value;  
    this.student.student_branch=this.StudentBranch!.value;  
    this.submitted = true;  
    this.save();  
  }  
  save() {  
    this.studentService.createStudent(this.student)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.student = new Student();  
  }

  get StudentName(){  
    return this.studentsaveform.get('student_name');  
  }  
  
  get StudentEmail(){  
    return this.studentsaveform.get('student_email');  
  }  
  
  get StudentBranch(){  
    return this.studentsaveform.get('student_branch');  
  }  

  addStudentForm(){  
    this.submitted=false;  
    this.studentsaveform.reset();  
  }  
}
