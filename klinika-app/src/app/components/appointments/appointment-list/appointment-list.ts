import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointments } from '../../../services/appointments';
import { Doctors } from '../../../services/doctors';
import { Patients } from '../../../services/patients';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointments: any[] = [];
  dateTime = '';
  reason = '';
  doctorId: number = 0;
  patientId: number = 0;
  doctorList:any[]=[];
  patientsList:any[]=[];
  constructor(
    private appointmentService: Appointments,
    private cdr: ChangeDetectorRef,
    private doctorService:Doctors,
    private patientsService:Patients,
    private router:Router,
    private authService:AuthService
  ) { }
  ngOnInit() {
    this.loadAppointments();
    this.doctorService.getAll().subscribe(data=>this.doctorList=data);
    this.patientsService.getAll().subscribe(data=>this.patientsList=data);
  }
  loadAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = [...data];
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }
  createAppointment() {
    if (!this.dateTime || !this.reason) return;

    this.appointmentService.create({

      dateTime: this.dateTime + ':00.000Z',
      reason: this.reason,
      doctorId: +this.doctorId,
      patientId: +this.patientId
    }).subscribe({
      next: () => {
        this.loadAppointments();
        this.dateTime = '';
        this.reason = '';
        this.doctorId = 0;
        this.patientId = 0;
      },
      error: (err) => console.error(err)
    });
  }
  goBack(){
    const user=this.authService.getUserFromToken();
    if(user?.role==='ADMIN') this.router.navigate(['/admin-dashboard']);
    else if(user?.role==='DOCTOR') this.router.navigate(['/doctor-dashboard']);
    else if(user?.role==='PATIENT') this.router.navigate(['/patient-dashboard']);
  }
}
 