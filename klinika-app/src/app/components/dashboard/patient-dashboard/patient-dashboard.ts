import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Appointments } from '../../../services/appointments';
import { Patients } from '../../../services/patients';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { loadAppointments } from '../../../store/appointment.actions';
import { selectAllAppointments } from '../../../store/appointment.selectors';
import type { Appointment } from '../../../models/interfaces';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard implements OnInit {
  appointments: Appointment[] = [];
  appointments$: Observable<Appointment[]>;
  userName = '';
  fullName = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private appointmentsService: Appointments,
    private patientService: Patients,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.appointments$ = this.store.select(selectAllAppointments) as Observable<Appointment[]>;
  }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    this.patientService.getByUserId(user.sub).subscribe({
      next: (patient: any) => {
        this.fullName = patient.firstName + ' ' + patient.lastName;
        this.cdr.markForCheck();
      },
      error: (err: any) => console.error(err)
    });

    this.store.dispatch(loadAppointments());
    this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
      this.appointments = data.filter(a => a.patient?.userId === user.sub);
      this.cdr.markForCheck();
    });
  }

  cancelAppointment(appointmentId: number) {
    if (!confirm('Da li ste sigurni da zelite da otkazete termin?')) return;
    this.appointmentsService.updateStatus(appointmentId, 'CANCELLED').subscribe({
      next: () => {
        this.store.dispatch(loadAppointments());
        this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
          const user = this.authService.getUserFromToken();
          this.appointments = data.filter(a => a.patient?.userId === user.sub);
          this.cdr.markForCheck();
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