import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Appointments {
  private apiUrl='http://localhost:3000/appointments';
  constructor(private http:HttpClient){}
  getAll():Observable<any>{
    return this.http.get(this.apiUrl);
  }
  create(data:{dateTime:string,reason:string,doctorId:number,patientId:number}):Observable<any>{
    return this.http.post(this.apiUrl,data);
  }
}
