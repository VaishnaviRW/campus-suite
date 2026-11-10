
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { AddStudentComponent } from '../../../../features/students/components/add-student/add-student.component';
import { EditStudentComponent } from '../../../../features/students/components/edit-student/edit-student.component';
import { StudentDetailsComponent } from '../../../../features/students/components/student-details/student-details.component';
import { StudentListComponent } from '../../../../features/students/components/student-list/student-list.component';




@NgModule({
  declarations: [
    StudentListComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    EditStudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }

