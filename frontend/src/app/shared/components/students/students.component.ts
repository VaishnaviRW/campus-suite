import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
interface Student {_id?:string;id?:string;name:string;rollNumber:string;className:string;gender:string;dateOfBirth:string;email:string;phone:string;address:string;parentName:string;parentPhone:string;photo:string;}
@Component({selector:'app-students',templateUrl:'./students.component.html',styleUrls:['./students.component.css']})
export class StudentsComponent implements OnInit {
 students:Student[]=[];searchText='';selectedPhoto='';selectedStudent:Student|null=null;isEditMode=false;editingStudentId:string|null=null;loading=false;errorMessage='';showForm=false;
 studentForm={name:'',rollNumber:'',className:'',gender:'',dateOfBirth:'',email:'',phone:'',address:'',parentName:'',parentPhone:''};
 constructor(private api:ApiService){} ngOnInit():void{this.loadStudents();}
 loadStudents():void{this.loading=true;this.errorMessage='';this.api.list<Student>('students').subscribe({next:r=>{this.students=r||[];this.loading=false;},error:e=>{this.errorMessage=e.error?.message||'Unable to load students. Check the API and database.';this.loading=false;}});}
 get totalStudents():number{return this.students.length;}get maleStudents():number{return this.students.filter(s=>(s.gender||'').toLowerCase()==='male').length;}get femaleStudents():number{return this.students.filter(s=>(s.gender||'').toLowerCase()==='female').length;}
 get filteredStudents():Student[]{const q=this.searchText.trim().toLowerCase();return this.students.filter(s=>[s.name,s.rollNumber,s.className,s.email,s.phone].some(v=>(v||'').toLowerCase().includes(q)));}
 onPhotoSelected(event:Event):void{const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;if(!file.type.startsWith('image/')||file.size>2*1024*1024){this.errorMessage='Choose an image up to 2 MB.';input.value='';return;}const reader=new FileReader();reader.onload=()=>this.selectedPhoto=String(reader.result||'');reader.readAsDataURL(file);}
 addStudent():void{const payload={...this.studentForm,photo:this.selectedPhoto};const req=this.isEditMode&&this.editingStudentId?this.api.update<Student>('students',this.editingStudentId,payload):this.api.create<Student>('students',payload);req.subscribe({next:()=>{this.resetForm();this.showForm=false;this.loadStudents();},error:e=>this.errorMessage=e.error?.message||'Unable to save student. Admin or Teacher access is required.'});}
 resetForm():void{this.studentForm={name:'',rollNumber:'',className:'',gender:'',dateOfBirth:'',email:'',phone:'',address:'',parentName:'',parentPhone:''};this.selectedPhoto='';this.isEditMode=false;this.editingStudentId=null;}
 viewStudent(s:Student):void{this.selectedStudent=s;}closeView():void{this.selectedStudent=null;}
 editStudent(s:Student):void{this.isEditMode=true;this.editingStudentId=s._id||s.id||null;this.studentForm={name:s.name||'',rollNumber:s.rollNumber||'',className:s.className||'',gender:s.gender||'',dateOfBirth:s.dateOfBirth||'',email:s.email||'',phone:s.phone||'',address:s.address||'',parentName:s.parentName||'',parentPhone:s.parentPhone||''};this.selectedPhoto=s.photo||'';}
 deleteStudent(id?:string):void{if(!id||!confirm('Delete this student record?'))return;this.api.remove('students',id).subscribe({next:()=>this.loadStudents(),error:e=>this.errorMessage=e.error?.message||'Unable to delete student. Administrator access may be required.'});}
}
