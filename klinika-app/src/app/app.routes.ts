import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register';
import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { DoctorDashboard } from './components/dashboard/doctor-dashboard/doctor-dashboard';
import { PatientDashboard } from './components/dashboard/patient-dashboard/patient-dashboard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'admin-dashboard',component:AdminDashboard},
    {path:'doctor-dashboard',component:DoctorDashboard},
    {path:'patient-dashboard',component:PatientDashboard},
];
