import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LooseObject } from './types';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getDocInfo(doctorId: string) {
    const url = `${environment.API_URL}/doctors/${doctorId}`;
    return this._httpClient.get(url);
  }

  public getSlots(date: string) {
    const url = `${environment.API_URL}/appointments/slots/${date}`;
    return this._httpClient.get(url);
  }

  public getEvents(dateRangeStartDate: string, dateRangeEndDate: string) {
    const url = `${environment.API_URL}/appointments?startDate=${dateRangeStartDate}&endDate=${dateRangeEndDate}`;
    return this._httpClient.get(url);
  }

  public createAppointment(appointmentInfo: LooseObject = {}) {
    const url = `${environment.API_URL}/appointments`;
    return this._httpClient.post(url, appointmentInfo);
  }
}
