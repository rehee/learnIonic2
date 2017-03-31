import { Component } from '@angular/core';
import { Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeviceService, CommonService, DataService, MenuItems, CoreFunction } from '../providers/common-service';
import { Storage } from '@ionic/storage';
// import { TabsPage } from '../pages/tabs/tabs';
import { HomePage, LogoutComponent } from '../pages/index';
import { Device } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  load = this.loading.create({ content: 'Loading...' });
  sideMenus: any[] = [];

  async openPage(page: any, newPage: boolean = false) {
    if (page == LogoutComponent) {
      let load = this.loading.create({ content: 'Logout now...' });
      load.present();
      await this.dataService.FetchContentData(true);
      load.dismiss();
      this.rootPage = HomePage;
    } else {
      this.rootPage = page;
    }
  }

  constructor(private loading: LoadingController, platform: Platform, deviceService: DeviceService, public commonService: CommonService, storage: Storage, public dataService: DataService, public push: Push, private menus: MenuItems, private event: Events) {

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
      let c = CoreFunction.ComponseFunctins([
        (int) => Math.round(int / 1000 / 60 / 60 / 24 / 365),
        (int) => new Date().getTime() - int,
        async (date) => {
          await CoreFunction.Delay(1000);
          return date.getTime();
        },
        (input) => new Date(input)
      ]);


      storage.ready().then(
        () => {
          CoreFunction.ExcutingFunctionByList([
            async () => await commonService.GetChurchAsync(),
            async () => await dataService.initData()
          ])(async () => {
            this.load.dismiss();
            this.event.publish('LoginMayChange', await this.dataService.getUserAuthAsync());
            this.sideMenus = this.menus.MenuItems;
            console.log(await c('2000-01-01'));
            console.log(await c('2001-01-01'));
            console.log(await c('2002-01-01'));
          });
        }
      );
    });
  }

  private async initData() {
    await this.commonService.GetChurchAsync();
    await this.dataService.initData();
    this.load.dismiss();
    this.event.publish('LoginMayChange', await this.dataService.getUserAuthAsync());
    this.sideMenus = this.menus.MenuItems;
  }

}


