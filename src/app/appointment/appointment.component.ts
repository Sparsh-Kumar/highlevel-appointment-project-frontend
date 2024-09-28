import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppointmentService } from './appointment.service';
import Swal from 'sweetalert2';
import { LooseObject, SlotInformation } from './types';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  public doctorId: string = environment.DOCTORID;
  public doctorName: string = ''
  public doctorEmail: string = '';
  public selectedDate: Date = moment().toDate();
  public dateRangeStartDate: Date = moment().toDate();
  public dateRangeEndDate: Date = moment().toDate();
  public availableSlots: string[] = [];
  public availableEvents: string[] = [];
  public dialogWidth: string = '25%';
  public dialogHeight: string = '65%';

  constructor(
    private readonly _dialog: MatDialog,
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

  public getEvents() {
    this._spinner.show();
    this._appointmentService.getEvents(
      moment(this.dateRangeStartDate).format('YYYY-MM-DD'),
      moment(this.dateRangeEndDate).format('YYYY-MM-DD'),
    ).subscribe((response: LooseObject) => {
      this._spinner.hide();
      const { data } = response;
      this.availableEvents = data.map((e: LooseObject) => {
        const start = moment(e['appointmentStartTime']).format('HH:mm');
        const end = moment(e['appointmentEndTime']).format('HH:mm');
        return `${start} - ${end}`;
      });
    }, (error) => {
      this._spinner.hide();
      Swal.fire({
        title: 'Error !',
        text: 'Error getting events information.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

  public onDateSelected(date: Date) {
    this.selectedDate = date;
    this.getSlots();
  }

  public bookSlot(slot: string) {
    const metaData: LooseObject = {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {
        doctorId: this.doctorId,
        appointmentDate: this.selectedDate,
        slot: slot
      }
    };
    const dialogReference: MatDialogRef<CreateAppointmentComponent, LooseObject> = this._dialog.open(CreateAppointmentComponent, metaData);
    dialogReference.afterClosed().subscribe((response: LooseObject | undefined) => {
      this.getSlots();
    });

  }

  public onStartDateRangeChange(e: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.dateRangeStartDate = e.target.value;
  }

  public onEndDateRangeChange(e: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.dateRangeEndDate = e.target.value;
    this.getEvents();
  }
}
