import { createReducer, on } from "@ngrx/store";
import { Appointment } from "../models/interfaces";
import { loadAppointmentsSuccess } from "./appointment.actions";

export interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
}
export const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null
}
export const appointmentReducer = createReducer(
    initialState,
    on(loadAppointmentsSuccess, (state, { appointments }) => ({
        ...state,
        appointments,
        loading: false
    }))
);