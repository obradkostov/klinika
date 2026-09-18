import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppointmentState } from './appointment.reducer';
import { Appointment } from '../models/interfaces';

export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointments');

export const selectAllAppointments = createSelector(
  selectAppointmentState,
  (state: AppointmentState): Appointment[] => state.appointments
);