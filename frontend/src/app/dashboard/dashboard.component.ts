import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
@Component({selector:'app-dashboard',templateUrl:'./dashboard.component.html',styleUrls:['./dashboard.component.css']})
export class DashboardComponent implements OnInit {
  counts:any={students:0,teachers:0,courses:0,attendance:0}; loading=true; today=new Date();
  constructor(public auth:AuthService,private api:ApiService){}
  ngOnInit():void{const keys=['students','teachers','courses','attendance'];let done=0;const finish=()=>{done++;if(done===keys.length)this.loading=false;};keys.forEach(k=>this.api.list<any>(k).subscribe({next:r=>{this.counts[k]=r.length;finish();},error:()=>finish()}));}
  get userName():string{return this.auth.getCurrentUser()?.name||'Administrator';}
}
