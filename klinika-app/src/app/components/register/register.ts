import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  email='';
  password='';
  role='PATIENT';
  error='';
  constructor(private authService:AuthService,private router:Router){}
  register(){
    this.authService.register(this.email,this.password,this.role).subscribe({
      next:()=>{
        this.router.navigate(['/login']);
      },
      error:()=>{
        this.error="Greska pri registraciji";
      }
    });
  }
}
