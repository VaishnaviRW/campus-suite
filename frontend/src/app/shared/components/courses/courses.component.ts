import {Component,OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
interface CourseRecord{_id?:string;name:string;code:string;description:string;duration:string;}
@Component({selector:'app-courses',templateUrl:'./courses.component.html',styleUrls:['./courses.component.css']})
export class CoursesComponent implements OnInit{
 courses:CourseRecord[]=[];form:CourseRecord={name:'',code:'',description:'',duration:''};editingId:string|null=null;error='';loading=false;
 constructor(private api:ApiService){}
 ngOnInit():void{this.load();}
 load():void{this.loading=true;this.api.list<CourseRecord>('courses').subscribe({next:x=>{this.courses=x;this.loading=false;},error:e=>{this.error=e.error?.message||'Unable to load courses';this.loading=false;}});}
 save():void{const req=this.editingId?this.api.update('courses',this.editingId,this.form):this.api.create('courses',this.form);req.subscribe({next:()=>{this.reset();this.load();},error:e=>this.error=e.error?.message||'Save failed. Admin or Teacher role required.'});}
 edit(c:CourseRecord):void{this.editingId=c._id||null;this.form={name:c.name,code:c.code,description:c.description,duration:c.duration};}
 remove(id?:string):void{if(!id||!confirm('Delete this course?'))return;this.api.remove('courses',id).subscribe({next:()=>this.load(),error:e=>this.error=e.error?.message||'Delete failed'});}
 reset():void{this.editingId=null;this.form={name:'',code:'',description:'',duration:''};}
}
