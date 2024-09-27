import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModule { }
