import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
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
                this.router.navigate(['/dashboard']);
            },
            error: () => {
                this.error = 'Pogresan email i lozinka';
            }
        });
    }
}