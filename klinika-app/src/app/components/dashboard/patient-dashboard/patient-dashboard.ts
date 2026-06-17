import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard implements OnInit{
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(){}
  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
