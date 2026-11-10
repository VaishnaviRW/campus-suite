import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './shared/components/students/students.component';
import { TeachersComponent } from './shared/components/teachers/teachers.component';
import { CoursesComponent } from './shared/components/courses/courses.component';
import { AuthGuard } from './services/auth.guard';
import { RecordsComponent } from './shared/components/records/records.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'students',component:StudentsComponent,canActivate:[AuthGuard]},
  {path:'teachers',component:TeachersComponent,canActivate:[AuthGuard]},
  {path:'courses',component:CoursesComponent,canActivate:[AuthGuard]},
  {path:':type',component:RecordsComponent,canActivate:[AuthGuard],data:{}, runGuardsAndResolvers:'paramsChange'},
  {path:'**',redirectTo:'login'}
];
@NgModule({imports:[RouterModule.forRoot(routes)],exports:[RouterModule]})
export class AppRoutingModule {}
