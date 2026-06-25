import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Appointments } from '../../../services/appointments';
import { FormsModule } from '@angular/forms';
import { Diagnosis } from '../../../services/diagnosis';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard implements OnInit {
  appointments: any[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private appointmentsService: Appointments,
    private diagnosisService: Diagnosis,
    private cdr: ChangeDetectorRef
  ) { }
  userName = '';
  selectedAppointmentId: number | null = null;
  diagnosisDescription = '';
  diagnosisPrescription = '';
  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    if (user) {
      this.appointmentsService.getAll().subscribe({
        next: (data) => {
          this.appointments = data.filter((a: any) => a.doctor?.userId === user.sub);
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  }
  updateStatus(appointmentId: number, status: string) {
    this.appointmentsService.updateStatus(appointmentId, status).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => console.error(err)
    });
  }
  openDiagnosisForm(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    this.diagnosisDescription = '';
    this.diagnosisPrescription = '';
  }
  submitDiagnosis(){
    if(!this.selectedAppointmentId || !this.diagnosisDescription) return;
    this.diagnosisService.create({
      description:this.diagnosisDescription,
      prescription:this.diagnosisPrescription,
      appointmentId:this.selectedAppointmentId!
    }).subscribe({
      next:()=>{
        this.selectedAppointmentId=null;
        this.ngOnInit();
      },
      error:(err)=>console.error(err)
    })
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
