import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{
   constructor(private authService:AuthService,private router:Router){}
    ngOnInit(){}
    logout(){
        this.authService.logOut;
        this.router.navigate(['/login']);
    }
}
