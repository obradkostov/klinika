import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.css'
})
export class LoginComponent {
    email= '';
    password= '';
    error= '';
    constructor(private authService: AuthService, private router: Router) { }
    login() {
        this.authService.login(this.email, this.password).subscribe({
            next: (res) => {
                this.authService.saveToken(res.access_token);
                const role=this.getRoleFromToken(res.access_token);
                if(role=='ADMIN')this.router.navigate(['/admin-dashboard']);
                else if(role=='DOCTOR')this.router.navigate(['/doctor-dashboard']);
                else if(role=='PATIENT')this.router.navigate(['/patient-dashboard']);
            },
            error: () => {
                this.error = 'Pogresan email i lozinka';
            }
        });
    }
    getRoleFromToken(token:string):string{
        const payload=JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    }
}