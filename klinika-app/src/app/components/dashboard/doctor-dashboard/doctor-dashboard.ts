import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Diagnosis } from '../../../services/diagnosis';
import { Doctors } from '../../../services/doctors';
import { Appointments } from '../../../services/appointments';
import { AppointmentItemComponent } from '../../appointments/appointment-item/appointment-item.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { loadAppointments } from '../../../store/appointment.actions';
import { selectAllAppointments } from '../../../store/appointment.selectors';
import type { Appointment } from '../../../models/interfaces';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, RouterLink, FormsModule, AppointmentItemComponent],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard implements OnInit {
  appointments: Appointment[] = [];
  appointments$: Observable<Appointment[]>;
  userName = '';
  fullName = '';
  selectedAppointmentId: number | null = null;
  diagnosisDescription = '';
  diagnosisPrescription = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private diagnosisService: Diagnosis,
    private doctorService: Doctors,
    private appointmentsService: Appointments,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.appointments$ = this.store.select(selectAllAppointments) as Observable<Appointment[]>;
  }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    this.doctorService.getByUserId(user.sub).subscribe({
      next: (doctor: any) => {
        this.fullName = doctor.firstName + ' ' + doctor.lastName;
        this.cdr.markForCheck();
      },
      error: (err: any) => console.error(err)
    });

    this.store.dispatch(loadAppointments());
    this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
      this.appointments = data.filter(a => a.doctor?.userId === user.sub);
      this.cdr.markForCheck();
    });
  }

  updateStatus(appointmentId: number, status: string) {
    this.appointmentsService.updateStatus(appointmentId, status).subscribe({
      next: () => {
        this.store.dispatch(loadAppointments());
        this.appointments$.pipe(take(1)).subscribe((data: Appointment[]) => {
          const user = this.authService.getUserFromToken();
          this.appointments = data.filter(a => a.doctor?.userId === user.sub);
          this.cdr.markForCheck();
        });
      },
      error: (err: any) => console.error(err)
    });
  }

  openDiagnosisForm(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    this.diagnosisDescription = '';
    this.diagnosisPrescription = '';
  }

  submitDiagnosis() {
    if (!this.selectedAppointmentId || !this.diagnosisDescription) return;
    this.diagnosisService.create({
      description: this.diagnosisDescription,
      prescription: this.diagnosisPrescription,
      appointmentId: this.selectedAppointmentId!
    }).subscribe({
      next: () => {
        this.appointmentsService.updateStatus(this.selectedAppointmentId!, 'COMPLETED').subscribe({
          next: () => {
            this.selectedAppointmentId = null;
            this.store.dispatch(loadAppointments());
            this.appointments$.pipe(take(1)).subscribe((data: Appointment[]) => {
              const user = this.authService.getUserFromToken();
              this.appointments = data.filter(a => a.doctor?.userId === user.sub);
              this.cdr.markForCheck();
            });
          },
          error: (err: any) => console.error(err)
        });
      },
      error: (err: any) => console.error(err)
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}