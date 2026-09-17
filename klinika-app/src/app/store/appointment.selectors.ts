import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppointmentState } from "./appointment.reducer";

export const selectAppointmentState=createFeatureSelector<AppointmentState>('appointments');
export const selectAllAppointments=createSelector(
    selectAppointmentState,

);