import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LooseObject } from '../types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import Swal from 'sweetalert2';
import { AppointmentService } from '../appointment.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private readonly _appointmentService: AppointmentService,
    private readonly _spinner: NgxSpinnerService,
    private readonly _dialogRef: MatDialogRef<CreateAppointmentComponent>
  ) {

    const nameValidations = [
      Validators.minLength(4),
      Validators.maxLength(60),
      Validators.required,
    ];

    this.appointmentInfo = new FormGroup({
      doctorId: new FormControl(data['doctorId']),
      patientName: new FormControl('', nameValidations),
      appointmentDuration: new FormControl(30, [Validators.required]),
      appointmentDate: new FormControl(moment(data['appointmentDate']).format('YYYY-MM-DD'), [Validators.required]),
      appointmentStartTime: new FormControl(data['slot'], [Validators.required])
    });

  }

  public submitAppointmentInfo() {
    if (this.appointmentInfo?.valid) {
      this._spinner.show();
      this._appointmentService.createAppointment(this.appointmentInfo.value).subscribe(() => {
        this._spinner.hide();
        Swal.fire({
          icon: "success",
          title: "Your appointment has been created successfully.",
          showConfirmButton: true
        }).then(() => {
          this._dialogRef.close();
        })
      }, (error) => {
        this._spinner.hide();
        Swal.fire({
          title: 'Error !',
          text: 'Facing technical difficulty in creating your appointment.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          this._dialogRef.close();
        });
      })
    }
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
