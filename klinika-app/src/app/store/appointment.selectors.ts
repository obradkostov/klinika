import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppointmentState, adapter } from './appointment.reducer';
import { Appointment } from '../models/interfaces';

export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointments');

export const selectAllAppointments = createSelector(
  selectAppointmentState,
  adapter.getSelectors().selectAll
);