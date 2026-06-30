import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Doctors {
  private apiUrl='http://localhost:3000/doctors';
  constructor(private http:HttpClient){}
  getAll():Observable<any>{
    return this.http.get(this.apiUrl);
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
