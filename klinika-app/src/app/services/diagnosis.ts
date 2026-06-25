import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root',
})
export class Diagnosis{
    private apiUrl='http://localhost:3000/diagnosis';
    constructor(private http:HttpClient){}
    create(data:{description:string,prescription?:string,appointmentId:number}){
        return this.http.post(this.apiUrl,data);
    }
}