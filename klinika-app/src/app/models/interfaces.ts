export interface User{
    id:number;
    email:string;
    role:string;
}
export interface Doctor{
    id:number;
    firstName:string;
    lastName:string;
    specialization:string;
    userId:number;
    user:User;
}
export interface Patient{
    id:number;
    firstName:string;
    lastName:string;
    dateOfBirth:string;
    userId:number;
    user:User;
}
export interface Nurse{
    id:number;
    firstName:string;
    lastName:string;
    userId:number;
    user:User;
}
export interface Diagnosis {
  id: number;
  description: string;
  prescription?: string;
  appointmentId: number;
}

export interface Appointment {
  id: number;
  dateTime: string;
  status: string;
  reason: string;
  doctorId: number;
  patientId: number;
  doctor?: Doctor;
  patient?: Patient;
  diagnosis?: Diagnosis;
}