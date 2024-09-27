import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  public selectedDate: Date | null = null;
  public onDateSelected(date: Date) {
    this.selectedDate = date;
  }
}
