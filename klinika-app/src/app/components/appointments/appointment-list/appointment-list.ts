import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointments } from '../../../services/appointments';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointments: any[] = [];
  dateTime = '';
  reason = '';
  doctorId: number = 0;
  patientId: number = 0;
  constructor(private appointmentService: Appointments,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit() {
    this.loadAppointments();
  }
  loadAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
  createAppointment() {
    if (!this.dateTime || !this.reason) return;

    this.appointmentService.create({

      dateTime: this.dateTime + ':00.000Z',
      reason: this.reason,
      doctorId: this.doctorId,
      patientId: this.patientId
    }).subscribe({
      next: () => {
        this.loadAppointments();
        this.dateTime = '';
        this.reason = '';
        this.doctorId = 0;
        this.patientId = 0;
      },
      error: (err) => console.error(err)
    });
  }
}
