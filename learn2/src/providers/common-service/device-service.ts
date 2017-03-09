import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DeviceModule } from './device';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';



/*
  Generated class for the CommenService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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


  constructor(public http: Http) {

  }






  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
