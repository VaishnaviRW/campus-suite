import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

interface Field { key: string; label: string; type?: string; }
@Component({ selector: 'app-records', templateUrl: './records.component.html', styleUrls: ['./records.component.css'] })
export class RecordsComponent implements OnInit {
  type = ''; title = ''; records: any[] = []; fields: Field[] = [];
  form: any = {}; editingId = ''; loading = false; error = ''; success = '';
  private configs: any = {
    classes: {title:'Classes', fields:[['className','Class / Division'],['academicYear','Academic Year'],['course','Course'],['room','Room'],['classTeacher','Class Teacher']]},
    subjects: {title:'Subjects', fields:[['subjectName','Subject Name'],['subjectCode','Subject Code'],['course','Course'],['semester','Semester'],['faculty','Faculty'],['credits','Credits']]},
    attendance: {title:'Attendance', fields:[['studentName','Student Name'],['studentId','Student ID'],['className','Class / Division'],['date','Date','date'],['subject','Subject'],['status','Status']]},
    examinations: {title:'Examinations', fields:[['examName','Examination Name'],['course','Course'],['semester','Semester'],['examDate','Exam Date','date'],['maxMarks','Maximum Marks'],['venue','Venue']]},
    results: {title:'Results', fields:[['studentName','Student Name'],['studentId','Student ID'],['examName','Examination'],['subject','Subject'],['marks','Marks Obtained'],['grade','Grade'],['result','Result']]},
    fees: {title:'Fees', fields:[['studentName','Student Name'],['studentId','Student ID'],['feeType','Fee Type'],['amount','Amount'],['paidAmount','Paid Amount'],['dueDate','Due Date','date'],['status','Payment Status']]},
    assignments: {title:'Assignments', fields:[['title','Assignment Title'],['course','Course'],['subject','Subject'],['description','Description'],['dueDate','Due Date','date'],['assignedBy','Assigned By']]},
    submissions: {title:'Submissions', fields:[['assignmentTitle','Assignment'],['studentName','Student Name'],['studentId','Student ID'],['submittedOn','Submitted On','date'],['fileUrl','File / Link'],['status','Status'],['marks','Marks']]},
    announcements: {title:'Announcements', fields:[['title','Title'],['message','Message'],['audience','Audience'],['publishDate','Publish Date','date'],['priority','Priority']]}
  };
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}
  ngOnInit(): void { this.route.paramMap.subscribe(p => { this.type = p.get('type') || ''; this.configure(); this.load(); }); }
  configure(): void {
    if (!this.configs[this.type]) { this.router.navigate(['/dashboard']); return; }
    const c = this.configs[this.type];
    this.title = c.title; this.fields = c.fields.map((x: any) => ({key:x[0],label:x[1],type:x[2] || 'text'}));
    this.reset();
  }
  load(): void { this.loading = true; this.error = ''; this.api.list<any>(this.type).subscribe({next:r=>{this.records=r||[];this.loading=false;},error:e=>{this.error=e.error?.message || 'Unable to load records. Check that the API and database are running.';this.loading=false;}}); }
  reset(): void { this.form={}; this.fields.forEach(f=>this.form[f.key]=''); this.editingId=''; }
  save(): void {
    this.error=''; this.success='';
    const payload:any={}; this.fields.forEach(f=>payload[f.key]=this.form[f.key]);
    const request = this.editingId ? this.api.update<any>(this.type,this.editingId,payload) : this.api.create<any>(this.type,payload);
    request.subscribe({next:()=>{this.success=this.editingId?'Record updated successfully.':'Record added successfully.';this.reset();this.load();},error:e=>this.error=e.error?.message || 'Save failed. Please try again.'});
  }
  edit(row:any): void { this.editingId=row._id; this.fields.forEach(f=>this.form[f.key]=row[f.key] ?? ''); window.scrollTo(0,0); }
  remove(row:any): void { if(!confirm('Delete this record permanently?')) return; this.api.remove(this.type,row._id).subscribe({next:()=>{this.success='Record deleted.';this.load();},error:e=>this.error=e.error?.message || 'Delete failed.'}); }
  value(row:any,key:string): string { return row[key] === undefined || row[key] === null ? '—' : String(row[key]); }
}
