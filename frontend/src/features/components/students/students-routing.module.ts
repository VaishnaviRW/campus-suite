import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from '../../../../features/students/components/add-student/add-student.component';
import { EditStudentComponent } from '../../../../features/students/components/edit-student/edit-student.component';
import { StudentDetailsComponent } from '../../../../features/students/components/student-details/student-details.component';
import { StudentListComponent } from '../../../../features/students/components/student-list/student-list.component';


const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'add',
    component: AddStudentComponent
    
  },
  {
    path: 'view/:id',
    component: StudentDetailsComponent
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }