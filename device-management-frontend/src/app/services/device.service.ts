import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private API = 'http://localhost:5000/api/devices';

  constructor(private http: HttpClient) {}

  getDevices() {
  const token = localStorage.getItem('token');

  return this.http.get(this.API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  addDevice(data: any) {
    return this.http.post(this.API, data);
  }
}
