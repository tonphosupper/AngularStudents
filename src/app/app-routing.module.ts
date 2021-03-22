import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './add-students/add-students.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path:'', redirectTo: 'view-student', pathMatch: 'full'},
  {path:'view-student', component: StudentListComponent},
  {path:'add-student', component: AddStudentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
