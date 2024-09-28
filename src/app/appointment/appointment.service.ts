import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
