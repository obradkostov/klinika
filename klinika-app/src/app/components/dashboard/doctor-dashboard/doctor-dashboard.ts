import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard implements OnInit{
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(){}
  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
