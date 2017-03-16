import { Injectable } from '@angular/core';
import { DeviceModule } from './device';
@Injectable()
export class DeviceService {
  ThisDevice: DeviceModule = new DeviceModule();

  SetDeviceModule(avaliable: boolean, platform: string, version: string, uuid: string, cordova: string, model: string, manufacturer: string, isVirtual: boolean, serial: string): DeviceModule {
    this.ThisDevice.avaliable = avaliable;
    this.ThisDevice.platform = platform;
    this.ThisDevice.version = version;
    this.ThisDevice.uuid = uuid;
    this.ThisDevice.cordova = cordova;
    this.ThisDevice.model = model;
    this.ThisDevice.manufacturer = manufacturer;
    this.ThisDevice.isVirtual = isVirtual;
    this.ThisDevice.serial = serial;
    return this.ThisDevice;
  }
  width: number = window.innerWidth;
  getWhoami(): any {
    let whoami = {};
    if (this.ThisDevice) {
      whoami['device_model'] = this.ThisDevice.model;
      whoami['device_platform'] = this.ThisDevice.platform;
      whoami['device_version'] = this.ThisDevice.version;
      whoami['uuid'] = this.ThisDevice.uuid;
      whoami['device_ptoken'] = '';
    }
    return whoami;
  }


  constructor() {

  }
}
