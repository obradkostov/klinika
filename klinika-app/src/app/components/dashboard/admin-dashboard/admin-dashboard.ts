import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Doctors } from '../../../services/doctors';
import { CommonModule } from '@angular/common';
import { Patients } from '../../../services/patients';
import { Nurses } from '../../../services/nurses';
import { FormsModule } from '@angular/forms';
import { Appointments } from '../../../services/appointments';
import { Store } from '@ngrx/store';
import { loadAppointments } from '../../../store/appointment.actions';
import { selectAllAppointments } from '../../../store/appointment.selectors';
import { skip, take } from 'rxjs';
import { Appointment, Doctor, Nurse } from '../../../models/interfaces';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  nurses: any[] = [];
  newDoctorEmail = '';
  newDoctorPassword = '';
  newDoctorFirstName = '';
  newDoctorLastName = '';
  newDoctorSpecialization = '';

  newNurseEmail = '';
  newNursePassword = '';
  newNurseFirstName = '';
  newNurseLastName = '';

  searchTerm = '';

  totalAppointments = 0;
  pendingAppointments = 0;
  confirmedAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;

  activeSection = 'stats';
  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorsService: Doctors,
    private patientsService: Patients,
    private nursesService: Nurses,
    private cdr: ChangeDetectorRef,
    private appointmentsService: Appointments,
    private store: Store
  ) { }

  ngOnInit() {
    this.doctorsService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.patientsService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.nursesService.getAll().subscribe({
      next: (data) => {
        this.nurses = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.store.dispatch(loadAppointments());
    this.store.select(selectAllAppointments).pipe(skip(1), take(1)).subscribe((data: Appointment[]) => {
      this.totalAppointments = data.length;
      this.pendingAppointments = data.filter(a => a.status === 'PENDING').length;
      this.confirmedAppointments = data.filter(a => a.status === 'CONFIRMED').length;
      this.completedAppointments = data.filter(a => a.status === 'COMPLETED').length;
      this.cancelledAppointments = data.filter(a => a.status === 'CANCELLED').length;
      this.cdr.markForCheck();
    });
  }
  createDoctor() {
    this.authService.register(this.newDoctorEmail, this.newDoctorPassword, 'DOCTOR').subscribe({
      next: (user) => {
        this.doctorsService.create({
          firstName: this.newDoctorFirstName,
          lastName: this.newDoctorLastName,
          specialization: this.newDoctorSpecialization,
          userId: user.id
        }).subscribe({
          next: () => {
            this.newDoctorEmail = '',
              this.newDoctorFirstName = '',
              this.newDoctorLastName = '',
              this.newDoctorPassword = '',
              this.newDoctorSpecialization = ''
            this.ngOnInit();
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
  deleteDoctor(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovog doktora?')) return;
    this.doctorsService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  deletePatient(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
    this.patientsService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  createNurse() {
    this.authService.register(this.newNurseEmail, this.newNursePassword, 'NURSE').subscribe({
      next: (user) => {
        this.nursesService.create({
          firstName: this.newNurseFirstName,
          lastName: this.newNurseLastName,
          userId: user.id
        }).subscribe({
          next: () => {
            this.newNurseEmail = '',
              this.newNurseFirstName = '',
              this.newNurseLastName = '',
              this.newNursePassword = '',
              this.ngOnInit();
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
  deleteNurse(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovu medicinsku sestru?')) return;
    this.nursesService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  filterPatients() {
    if (!this.searchTerm) return this.patients;
    const term = this.searchTerm.toLowerCase();
    return this.patients.filter((p) =>
      p.firstName.toLowerCase().includes(term) ||
      p.lastName.toLowerCase().includes(term) ||
      p.user.email.toLowerCase().includes(term)
    );
  }
  selectedDoctor: Doctor | null = null;
  doctorAppointmentCount = 0;

  selectDoctor(doctor: Doctor) {
    if (this.selectedDoctor?.id === doctor.id) {
      this.selectedDoctor = null;
      return;
    }
    this.selectedDoctor = doctor;
    this.store.select(selectAllAppointments).pipe(take(1)).subscribe((data: Appointment[]) => {
      this.doctorAppointmentCount = data.filter(a => a.doctorId === doctor.id).length;
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}