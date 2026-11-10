import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({providedIn:'root'})
export class ApiService {
  private readonly base=environment.apiUrl;
  constructor(private http:HttpClient){}
  list<T>(type:string):Observable<T[]>{return this.http.get<T[]>(`${this.base}/${type}`);}
  get<T>(type:string,id:string):Observable<T>{return this.http.get<T>(`${this.base}/${type}/${id}`);}
  create<T>(type:string,data:unknown):Observable<T>{return this.http.post<T>(`${this.base}/${type}`,data);}
  update<T>(type:string,id:string,data:unknown):Observable<T>{return this.http.put<T>(`${this.base}/${type}/${id}`,data);}
  remove(type:string,id:string):Observable<{message:string}>{return this.http.delete<{message:string}>(`${this.base}/${type}/${id}`);}
}
