import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Appointments } from '../../../services/appointments';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard implements OnInit {
  appointments: any[] = [];
  userName = '';
  constructor(
    private authService: AuthService, 
    private router: Router,
    private appointmentsService:Appointments,
    private cdr:ChangeDetectorRef
  ) { }
  ngOnInit() {
    const user=this.authService.getUserFromToken();
    this.userName=user?.email||'';
    if(user){
      this.appointmentsService.getAll().subscribe({
        next:(data)=>{
          this.appointments=data.filter((a:any)=>a.patient?.userId===user.sub);
          this.cdr.markForCheck();
        },
        error:(err)=>console.error(err)
      });
    }
   }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
