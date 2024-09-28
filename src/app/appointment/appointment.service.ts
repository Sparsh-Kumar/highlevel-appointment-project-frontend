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

  public getSlots(reqBody: LooseObject) {
    const url = `${environment.API_URL}/appointments/slots`;
    return this._httpClient.post(url, reqBody);
  }

  public getEvents(reqBody: LooseObject) {
    const url = `${environment.API_URL}/appointments/all`;
    return this._httpClient.post(url, reqBody);
  }

  public createAppointment(appointmentInfo: LooseObject = {}) {
    const url = `${environment.API_URL}/appointments`;
    return this._httpClient.post(url, appointmentInfo);
  }
}
