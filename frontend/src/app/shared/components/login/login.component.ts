import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({selector:'app-login',templateUrl:'./login.component.html',styleUrls:['./login.component.css']})
export class LoginComponent {
  email=''; password=''; errorMessage=''; loading=false; showPassword=false;
  constructor(private auth:AuthService,private router:Router){}
  login():void {
    this.errorMessage='';
    if(!this.email.trim()||!this.password){this.errorMessage='Please enter your email and password.';return;}
    this.loading=true;
    this.auth.login(this.email,this.password).subscribe({
      next:({user})=>{this.loading=false;this.router.navigate([user.role==='admin'?'/dashboard':`/${user.role}/dashboard`]);},
      error:(error)=>{this.loading=false;this.errorMessage=error.error?.message||'Unable to connect to the server. Please try again.';}
    });
  }
}
