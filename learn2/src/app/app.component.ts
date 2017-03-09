import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeviceService, CommonService, DataService } from '../providers/common-service';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { Device } from 'ionic-native';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  constructor(platform: Platform, deviceService: DeviceService, public commonService: CommonService, storage: Storage, public dataService: DataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if (Device.uuid != null) {
        deviceService.SetDeviceModule(true, Device.platform, Device.version, Device.uuid, Device.cordova, Device.model, Device.manufacturer, Device.isVirtual, Device.serial);
      } else {
        deviceService.SetDeviceModule(false, 'Android', '6.0.', 'c9ba08b93c1bc08', '6.1.2', 'Nexus 7', 'asus', true, '0793a2f4')
      }
      storage.ready().then(() => {
        commonService.getChurch().subscribe(
          response => {
            storage.set('appName', response.church.name);
            dataService.getContent().subscribe(resp => console.log(resp));
          }
        )
      });
      
    });
  }
}


