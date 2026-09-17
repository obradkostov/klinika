import {createAction, props} from '@ngrx/store'
import { Appointment } from '../models/interfaces';
export const loadAppointments=createAction('[Appointment] Load');
export const loadAppointmentsSuccess=createAction(
    '[Appointment] Load Success',
    props<{appointments:Appointment[]}>()
);
export const loadAppointmentsFailure=createAction(
    '[Appointment] Load Failure',
    props<{error:string}>()
);
export const updateAppointmentStatus=createAction(
    '[Appointment] Update Status',
    props<{id:number,status:string}>()
);