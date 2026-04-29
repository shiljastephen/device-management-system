import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceService } from '../../services/device.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  devices: any[] = [];

  constructor(
    private deviceService: DeviceService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.loadDevices();

    // 🔥 realtime updates
    this.socketService.onDeviceUpdate((updatedDevice: any) => {
      const index = this.devices.findIndex(d => d._id === updatedDevice._id);

      if (index !== -1) {
        this.devices[index] = updatedDevice;
      } else {
        this.devices.push(updatedDevice);
      }
    });
  }

  loadDevices() {
    this.deviceService.getDevices().subscribe((res: any) => {
      this.devices = res;
    });
  }
}