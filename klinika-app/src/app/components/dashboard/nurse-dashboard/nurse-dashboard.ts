import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nurses } from '../../../services/nurses';
import { Appointments } from '../../../services/appointments';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { loadAppointments } from '../../../store/appointment.actions';
import { selectAllAppointments } from '../../../store/appointment.selectors';
import type { Appointment } from '../../../models/interfaces';

@Component({
  selector: 'app-nurse-dashboard',
  imports: [CommonModule],
  templateUrl: './nurse-dashboard.html',
  styleUrl: './nurse-dashboard.css',
})
export class NurseDashboard implements OnInit {
  fullName = '';
  userName = '';
  appointments: Appointment[] = [];
  appointments$: Observable<Appointment[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private nursesService: Nurses,
    private appointmentService: Appointments,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.appointments$ = this.store.select(selectAllAppointments) as Observable<Appointment[]>;
  }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    if (user) {
      this.nursesService.getByUserId(user.sub).subscribe({
        next: (nurse: any) => {
          if (nurse) {
            this.fullName = nurse.firstName + ' ' + nurse.lastName;
            this.cdr.markForCheck();
          }
        },
        error: (err: any) => console.error(err)
      });

      this.store.dispatch(loadAppointments());
      this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
        this.appointments = [...data];
        this.cdr.markForCheck();
      });
    }
  }

  confirmArrival(appointmentId: number) {
    this.appointmentService.updateStatus(appointmentId, 'CONFIRMED').subscribe({
      next: () => {
        this.store.dispatch(loadAppointments());
        this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
          this.appointments = [...data];
          this.cdr.markForCheck();
        });
      },
      error: (err: any) => console.error(err)
    });
  }

  cancelAppointment(appointmentId: number) {
    if (!confirm('Da li ste sigurni da zelite da otkazete termin?')) return;
    this.appointmentService.updateStatus(appointmentId, 'CANCELLED').subscribe({
      next: () => {
        this.store.dispatch(loadAppointments());
        this.appointments$.pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
          this.appointments = [...data];
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