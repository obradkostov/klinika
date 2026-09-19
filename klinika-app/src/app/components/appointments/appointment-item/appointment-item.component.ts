import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Appointment } from '../../../models/interfaces';
@Component({
  selector: 'app-appointment-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointment-item">
      <span>{{appointment.dateTime | date:'dd.MM.yyyy HH:mm'}} - {{appointment.reason}} - {{appointment.status}}</span>
      <span *ngIf="appointment.patient"> - {{appointment.patient.firstName}} {{appointment.patient.lastName}}</span>
      <button *ngIf="appointment.status === 'PENDING'" (click)="onConfirm()">Potvrdi</button>
      <button *ngIf="appointment.status === 'PENDING'" (click)="onCancel()">Otkaži</button>
      <button *ngIf="appointment.status === 'CONFIRMED'" (click)="onDiagnosis()">Upiši nalaz</button>
    </div>
  `
})
export class AppointmentItemComponent {
  @Input() appointment!: Appointment;
  @Output() confirm = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<number>();
  @Output() diagnosis = new EventEmitter<number>();

  onConfirm() { this.confirm.emit(this.appointment.id); }
  onCancel() { this.cancel.emit(this.appointment.id); }
  onDiagnosis() { this.diagnosis.emit(this.appointment.id); }
}