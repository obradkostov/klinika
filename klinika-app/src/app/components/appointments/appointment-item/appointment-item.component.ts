import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Appointment } from '../../../models/interfaces';
@Component({
  selector: 'app-appointment-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display:flex; justify-content:space-between; align-items:center; padding: 8px 0; border-bottom: 1px solid #eee;">
      <span>{{appointment.dateTime | date:'dd.MM.yyyy HH:mm'}} - {{appointment.reason}} - {{appointment.status}}<span *ngIf="appointment.patient"> - {{appointment.patient.firstName}} {{appointment.patient.lastName}}</span></span>
      <div>
        <button *ngIf="appointment.status === 'PENDING'" (click)="onConfirm()" style="background:#27ae60;color:white;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;margin-right:4px;">Potvrdi</button>
        <button *ngIf="appointment.status === 'PENDING'" (click)="onCancel()" style="background:#e74c3c;color:white;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;margin-right:4px;">Otkaži</button>
        <button *ngIf="appointment.status === 'CONFIRMED'" (click)="onDiagnosis()" style="background:#2980b9;color:white;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;">Upiši nalaz</button>
      </div>
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