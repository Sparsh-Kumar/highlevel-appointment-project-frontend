import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppointmentService } from './appointment.service';
import Swal from 'sweetalert2';
import { LooseObject, SlotInformation } from './types';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  public doctorId: string = environment.DOCTORID;
  public doctorName: string = ''
  public doctorEmail: string = '';
  public selectedDate: Date = moment().startOf('month').toDate();
  public availableSlots: string[] = [];

  constructor(
    private readonly _appointmentService: AppointmentService,
    private readonly _spinner: NgxSpinnerService,
  ) { }

  public ngOnInit(): void {
    this.getDoctorInfo();
    this.getSlots();
  }

  public getDoctorInfo() {
    this._appointmentService.getDocInfo(this.doctorId).subscribe((response: LooseObject) => {
      const { data } = response;
      this.doctorName = data.name;
      this.doctorEmail = data.email;
    }, (error) => {
      Swal.fire({
        title: 'Error !',
        text: 'Error getting doctor information.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  public getSlots() {
    this._spinner.show();
    const currentDate = moment(this.selectedDate).format('YYYY-MM-DD');
    this._appointmentService.getSlots(currentDate).subscribe((response: LooseObject) => {
      setTimeout(() => {
        const { data } = response;
        this.availableSlots = data.map((slotInfo: SlotInformation) => {
          const slotStartingTime = slotInfo?.slotStartingTime;
          return moment(slotStartingTime).format('HH:mm');
        });
        this._spinner.hide();
      });
    }, (error) => {
      Swal.fire({
        title: 'Error !',
        text: 'Error getting free slots information.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });
  }

  public onDateSelected(date: Date) {
    this.selectedDate = date;
    this.getSlots();
  }
}
