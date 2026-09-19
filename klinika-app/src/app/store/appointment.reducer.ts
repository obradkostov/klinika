import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Appointment } from '../models/interfaces';
import { loadAppointmentsSuccess } from './appointment.actions';

export interface AppointmentState extends EntityState<Appointment> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Appointment> = createEntityAdapter<Appointment>();

export const initialState: AppointmentState = adapter.getInitialState({
  loading: false,
  error: null
});

export const appointmentReducer = createReducer(
  initialState,
  on(loadAppointmentsSuccess, (state, { appointments }) =>
    adapter.setAll(appointments, { ...state, loading: false })
  )
);

export const { selectAll } = adapter.getSelectors();