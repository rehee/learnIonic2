import { Component } from '@angular/core';
import { Platform,LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeviceService, CommonService, DataService } from '../providers/common-service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { Device } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  load = this.loading.create({content:'Loading...'});
  constructor(private loading: LoadingController,platform: Platform, deviceService: DeviceService, public commonService: CommonService, storage: Storage, public dataService: DataService, public push: Push) {
    this.load.present();
    platform.ready().then(() => {
      if (Device.uuid != null) {
        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
        });

        this.push.rx.notification()
          .subscribe((msg) => {
            alert(msg.title + ': ' + msg.text);
          });
      }


      StatusBar.styleDefault();

      Splashscreen.hide();

      if (Device.uuid != null) {
        deviceService.SetDeviceModule(true, Device.platform, Device.version, Device.uuid, Device.cordova, Device.model, Device.manufacturer, Device.isVirtual, Device.serial);
      } else {
        deviceService.SetDeviceModule(false, 'Android', '6.0.', 'c9ba08b93c1bc00', '6.1.2', 'Nexus 7', 'asus', true, '0793a2f4')

      }
      storage.ready().then(
        () => {
          this.initData();
        }
      );

    });
  }

  private async initData(){
    let church = await this.commonService.GetChurchAsync();
    await this.dataService.initData();
    this.load.dismiss();
  }

}


