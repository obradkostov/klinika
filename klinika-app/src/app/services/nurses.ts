import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class Nurses{
    private apiUrl='http://localhost:3000/nurses';
    constructor(private http:HttpClient){}
    getAll():Observable<any>{
        return this.http.get(this.apiUrl);
    }
}