import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'PATIENT';
  dateOfBirth = '';
  error = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Lozinke se ne poklapaju';
      return;
    }
    this.authService.register(this.email, this.password, this.role).subscribe({
      next: (user) => {
        this.http.post('http://localhost:3000/patients', {
          firstName: this.firstName,
          lastName: this.lastName,
          dateOfBirth: this.dateOfBirth + 'T00:00:00.000Z',
          userId: user.id
        }).subscribe({
          next: () => this.router.navigate(['/login']),
          error: () => this.error = 'Greška pri kreiranju profila'
        });
      },
      error: () => {
        this.error = "Greška pri registraciji";
      }
    });
  }
}
