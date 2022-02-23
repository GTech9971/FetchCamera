import { Component, OnInit } from '@angular/core';
import { Direction } from '../model/Direction';
import { FetchCameraService } from '../services/FetchCamera.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  get FORWARD(): Direction { return Direction.forward; }
  get BACK(): Direction { return Direction.back; }
  get LEFT(): Direction { return Direction.left; }
  get RIGHT(): Direction { return Direction.right; }

  connect: boolean;

  selectDevice: any;

  devices: any[];

  constructor(private service: FetchCameraService) {
    this.connect = false;
    this.devices = ["HC-05", "HK-06"];
    this.selectDevice = undefined;
  }

  async ngOnInit() {
    await this.service.init();
    await this.service.startScanning();
    this.devices = await this.service.getDevices();

    console.log(this.devices);
  }

  onClickBtn() {
    this.connect = !this.connect;
  }

}
