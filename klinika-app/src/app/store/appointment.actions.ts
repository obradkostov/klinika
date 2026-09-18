import { createAction, props } from '@ngrx/store';
import type { Appointment } from '../models/interfaces';

export const loadAppointments = createAction('[Appointment] Load');
export const loadAppointmentsSuccess = createAction(
  '[Appointment] Load Success',
  props<{ appointments: Appointment[] }>()
);
export const loadAppointmentsFailure = createAction(
  '[Appointment] Load Failure',
  props<{ error: string }>()
);