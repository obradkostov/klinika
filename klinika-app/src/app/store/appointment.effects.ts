import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Appointments } from '../services/appointments';
import { loadAppointments, loadAppointmentsSuccess, loadAppointmentsFailure } from './appointment.actions';

@Injectable()
export class AppointmentEffects {
  loadAppointments$: any;

  constructor(
    private actions$: Actions,
    private appointmentsService: Appointments
  ) {
    this.loadAppointments$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadAppointments),
        switchMap(() =>
          this.appointmentsService.getAll().pipe(
            map((appointments: any[]) => loadAppointmentsSuccess({ appointments })),
            catchError(error => of(loadAppointmentsFailure({ error: error.message })))
          )
        )
      )
    );
  }
}