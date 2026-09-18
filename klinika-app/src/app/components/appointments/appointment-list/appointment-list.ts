import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Appointments } from '../../../services/appointments';
import { Doctors } from '../../../services/doctors';
import { Patients } from '../../../services/patients';
import { AuthService } from '../../../services/auth.service';
import { loadAppointments } from '../../../store/appointment.actions';
import { selectAllAppointments } from '../../../store/appointment.selectors';
import { Appointment } from '../../../models/interfaces';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointments$: Observable<Appointment[]>;
  appointments: Appointment[] = [];
  dateTime = '';
  reason = '';
  doctorId: number = 0;
  patientId: number = 0;
  doctorList: any[] = [];
  patientsList: any[] = [];
  currentPatientId: number = 0;
  currentDoctorId: number = 0;
  userRole='';
  minDateTime = new Date().toISOString().slice(0, 16);
  
  filterStatus = '';

  constructor(
    private appointmentService: Appointments,
    private cdr: ChangeDetectorRef,
    private doctorService: Doctors,
    private patientsService: Patients,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    this.appointments$ = this.store.select(selectAllAppointments);
    this.userRole = this.authService.getUserFromToken()?.role || '';
  }

  ngOnInit() {
    this.store.dispatch(loadAppointments());
    
    this.appointments$.pipe(
      filter(appointments => appointments.length > 0),
      take(1)
    ).subscribe(data => {
      const user = this.authService.getUserFromToken();
      if (user?.role === 'PATIENT') {
        this.appointments = data.filter(a => a.patient?.userId === user.sub);
      } else if (user?.role === 'DOCTOR') {
        this.appointments = data.filter(a => a.doctor?.userId === user.sub);
      } else {
        this.appointments = [...data];
      }
      this.cdr.markForCheck();
    });

    this.doctorService.getAll().subscribe(data => this.doctorList = data);
    this.patientsService.getAll().subscribe(data => this.patientsList = data);
    
    const user = this.authService.getUserFromToken();
    if (user?.role === 'PATIENT') {
      this.patientsService.getByUserId(user.sub).subscribe({
        next: (patient: any) => {
          if (patient) this.currentPatientId = patient.id;
        }
      });
    }
    if (user?.role === 'DOCTOR') {
      this.doctorService.getByUserId(user.sub).subscribe({
        next: (doctor: any) => {
          if (doctor) this.currentDoctorId = doctor.id;
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  filterAppointments() {
    if (!this.filterStatus) return this.appointments;
    return this.appointments.filter(a => a.status === this.filterStatus);
  }

  loadAppointments() {
    this.store.dispatch(loadAppointments());
    this.appointments$.pipe(take(1)).subscribe(data => {
      const user = this.authService.getUserFromToken();
      if (user?.role === 'PATIENT') {
        this.appointments = data.filter(a => a.patient?.userId === user.sub);
      } else if (user?.role === 'DOCTOR') {
        this.appointments = data.filter(a => a.doctor?.userId === user.sub);
      } else {
        this.appointments = [...data];
      }
      this.cdr.markForCheck();
    });
  }

  createAppointment() {
    if (!this.dateTime || !this.reason) return;
    if (new Date(this.dateTime) < new Date()) {
      alert('Ne možete zakazati termin u prošlosti!');
      return;
    }
    const user = this.authService.getUserFromToken();
    this.appointmentService.create({
      dateTime: this.dateTime + ':00.000Z',
      reason: this.reason,
      doctorId: user?.role === 'DOCTOR' ? this.currentDoctorId : +this.doctorId,
      patientId: user?.role === 'PATIENT' ? this.currentPatientId : +this.patientId
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

  goBack() {
    const user = this.authService.getUserFromToken();
    if (user?.role === 'ADMIN') this.router.navigate(['/admin-dashboard']);
    else if (user?.role === 'DOCTOR') this.router.navigate(['/doctor-dashboard']);
    else if (user?.role === 'PATIENT') this.router.navigate(['/patient-dashboard']);
    else if (user?.role === 'NURSE') this.router.navigate(['/nurse-dashboard']);
  }
}