import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './shared/components/courses/courses.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { StudentsComponent } from './shared/components/students/students.component';
import { TeachersComponent } from './shared/components/teachers/teachers.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { RecordsComponent } from './shared/components/records/records.component';

@NgModule({
  declarations:[AppComponent,DashboardComponent,LoginComponent,SignupComponent,StudentsComponent,TeachersComponent,CoursesComponent,RecordsComponent],
  imports:[BrowserModule,FormsModule,HttpClientModule,AppRoutingModule],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap:[AppComponent]
})
export class AppModule {}
