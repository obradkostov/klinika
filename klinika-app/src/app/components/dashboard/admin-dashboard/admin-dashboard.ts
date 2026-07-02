import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Doctors } from '../../../services/doctors';
import { CommonModule } from '@angular/common';
import { Patients } from '../../../services/patients';
import { Nurses } from '../../../services/nurses';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink,FormsModule],
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorsService: Doctors,
    private patientsService: Patients,
    private nursesService: Nurses,
    private cdr: ChangeDetectorRef

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
  }
  createDoctor() {
    this.authService.register(this.newDoctorEmail, this.newDoctorPassword, 'DOCTOR').subscribe({
      next: (user) => {
        this.doctorsService.create({
          firstName: this.newDoctorFirstName,
          lastName:this.newDoctorLastName,
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
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
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
          lastName:this.newNurseLastName,
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
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
    this.nursesService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}