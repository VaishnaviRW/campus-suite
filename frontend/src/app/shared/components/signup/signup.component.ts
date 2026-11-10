import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({selector:'app-signup',templateUrl:'./signup.component.html',styleUrls:['./signup.component.css']})
export class SignupComponent {
  name=''; email=''; password=''; confirmPassword=''; errorMessage=''; loading=false; showPassword=false;
  constructor(private auth:AuthService,private router:Router){}
  signup():void {
    this.errorMessage='';
    if(this.password.length<8){this.errorMessage='Password must contain at least 8 characters.';return;}
    if(this.password!==this.confirmPassword){this.errorMessage='Passwords do not match.';return;}
    this.loading=true;
    this.auth.signup(this.name,this.email,this.password).subscribe({
      next:()=>{this.loading=false;this.router.navigate(['/dashboard']);},
      error:error=>{this.loading=false;this.errorMessage=error.error?.message||'Unable to create account. Please try again.';}
    });
  }
}
