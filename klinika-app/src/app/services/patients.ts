import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Patients {
  private apiUrl = 'http://localhost:3000/patients';
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getByUserId(userId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
