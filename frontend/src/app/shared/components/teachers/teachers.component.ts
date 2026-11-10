import {Component,OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
interface TeacherRecord{_id?:string;name:string;email:string;phone:string;subject:string;qualification:string;}
@Component({selector:'app-teachers',templateUrl:'./teachers.component.html',styleUrls:['./teachers.component.css']})
export class TeachersComponent implements OnInit{
 teachers:TeacherRecord[]=[]; selectedTeacher:TeacherRecord|null=null; form:TeacherRecord={name:'',email:'',phone:'',subject:'',qualification:''}; editingId:string|null=null; error=''; loading=false;
 constructor(private api:ApiService){}
 ngOnInit():void{this.load();}
 load():void{this.loading=true;this.api.list<TeacherRecord>('teachers').subscribe({next:x=>{this.teachers=x;this.loading=false;},error:e=>{this.error=e.error?.message||'Unable to load teachers';this.loading=false;}});}
 save():void{const req=this.editingId?this.api.update('teachers',this.editingId,this.form):this.api.create('teachers',this.form);req.subscribe({next:()=>{this.reset();this.load();},error:e=>this.error=e.error?.message||'Save failed. Admin or Teacher role required.'});}
 view(t:TeacherRecord):void{this.selectedTeacher=t;}
 edit(t:TeacherRecord):void{this.editingId=t._id||null;this.form={name:t.name,email:t.email,phone:t.phone,subject:t.subject,qualification:t.qualification};}
 remove(id?:string):void{if(!id||!confirm('Delete this teacher?'))return;this.api.remove('teachers',id).subscribe({next:()=>this.load(),error:e=>this.error=e.error?.message||'Delete failed'});}
 reset():void{this.editingId=null;this.form={name:'',email:'',phone:'',subject:'',qualification:''};}
}
