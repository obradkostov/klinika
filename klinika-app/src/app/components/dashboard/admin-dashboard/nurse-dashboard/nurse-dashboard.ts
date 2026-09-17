import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nurses } from '../../../../services/nurses';
import { Appointments } from '../../../../services/appointments';
@Component({
  selector: 'app-nurse-dashboard',
  imports: [CommonModule],
  templateUrl: './nurse-dashboard.html',
  styleUrl: './nurse-dashboard.css',
})
export class NurseDashboard implements OnInit {
  fullName = '';
  userName = '';
  appointments: any[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private nursesService: Nurses,
    private appointmentService: Appointments,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    if (user) {
      this.nursesService.getByUserId(user.sub).subscribe({
        next: (nurse) => {
          if (nurse) {
            this.fullName = nurse.firstName + ' ' + nurse.lastName;
            this.cdr.markForCheck();
          }
        },
        error: (err) => console.error(err)

      })
      this.appointmentService.getAll().subscribe({
        next: (data) => {
          this.appointments = data,
            this.cdr.markForCheck();
        },
        error: (err) => console.error(err)

      })
    }
  }
  confirmArrival(appointmentId: number) {
    this.appointmentService.updateStatus(appointmentId, 'CONFIRMED').subscribe({
      next: () => this.ngOnInit(),
      error: (err: any) => console.error(err)
    });
  }
  cancelAppointment(appointmentId: number) {
    if(!confirm("Da li ste sigurni da zelite da otkazete termin?"))return;
    this.appointmentService.updateStatus(appointmentId,'CANCELLED').subscribe({
      next:()=>this.ngOnInit(),
      error:(err)=>console.error(err)
      
    })
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
