import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LooseObject } from '../types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {

  public icon: string = 'thumb_up';
  public btnText: string = 'Submit';
  public title: string = 'Create Appointment';
  public appointmentInfo: FormGroup;
  public isSubmitBtnClicked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LooseObject,
  ) {

    const nameValidations = [
      Validators.minLength(4),
      Validators.maxLength(60),
      Validators.required,
    ];

    this.appointmentInfo = new FormGroup({
      name: new FormControl('', nameValidations),
      duration: new FormControl(30, [Validators.required]),
      notes: new FormControl(''),
      appointmentDate: new FormControl(moment(data['appointmentDate']).format('YYYY-MM-DD'), [Validators.required]),
      appointmentTime: new FormControl(data['slot'], [Validators.required])
    });

  }

  public ngOnInit() {
    console.log(this.data);
  }

  public submitAppointmentInfo() {
    console.log(this.appointmentInfo);
  }

  public isRequiredError(fieldName: string): boolean {
    return (this.appointmentInfo.get(fieldName)?.errors as any)?.required;
  }

  public isMaxLengthError(fieldName: string) {
    return (this.appointmentInfo.get(fieldName)?.errors as any)?.maxlength;
  }

  public isMinLengthError(fieldName: string) {
    return (this.appointmentInfo.get(fieldName)?.errors as any)?.minlength;
  }

}
