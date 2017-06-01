import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeviceService, CommonService, DataService, CoreFunction } from '../providers/common-service';
import { Storage } from '@ionic/storage';
// import { TabsPage } from '../pages/tabs/tabs';
import { HomePage, LogoutComponent, FootMenuPage, HomeTabs } from '../pages/index';
import { Device } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular'
import { Badge } from '@ionic-native/badge';
// import { Push as Pushs, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  @ViewChild('content') nav: NavController
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
  checkFunction: (string) => boolean;
  // private menus: MenuItems
  constructor(private loading: LoadingController, platform: Platform,
    deviceService: DeviceService, public commonService: CommonService,
    storage: Storage, public dataService: DataService, public push: Push,

    private event: Events, private badge: Badge) {
    
    this.load.present();
    this.event.subscribe('LoginChange', async (b) => {
      await this.RenewNotificationBadge();
    });
    platform.ready().then(() => {
      this.checkFunction = CoreFunction.IsSamePageCurrentTargetFunction(this.nav);
      if (Device.uuid != null) {

        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          deviceService.PushNotificationToken = t.token;

        }).catch(e => console.log(e));
        this.push.rx.notification()
          .subscribe(async (msg) => {
            await this.RenewNotificationBadge();
            event.publish('NewNotificationReceive');
            if (Device.platform.toLowerCase() == "ios") {
              this.push.plugin.finish(() => { }, () => { });
            }
          });

        platform.resume.subscribe(async () => {
          event.publish('NewNotificationReceive');
        });

        platform.registerBackButtonAction(() => {
          if (this.nav.canGoBack()) {
            this.nav.pop();
            return;
          }
          if (this.checkFunction("HomePage") == false) {
            this.nav.setRoot(HomePage, null, { animate: true, direction: 'back' });
            return;
          }
          if (confirm("Do you want exit?")) {
            platform.exitApp();
          }

        })
        this.event.subscribe('RenewBadgeNumber', (b) => {
          this.badge.set(b);
        });
      }
      // this.dataService.ReNewBadge();

      StatusBar.overlaysWebView(false);
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (Device.uuid != null) {
        deviceService.SetDeviceModule(true, Device.platform, Device.version, Device.uuid, Device.cordova, Device.model, Device.manufacturer, Device.isVirtual, Device.serial);
      } else {
        deviceService.SetDeviceModule(false, 'Android', '6.0.', 'c9ba08b93c1bc00', '6.1.2', 'Nexus 7', 'asus', true, '0793a2f4')
      }

      storage.ready().then(
        () => {
          CoreFunction.ExcutingFunctionByList([
            async () => await commonService.GetChurchAsync(),
            async () => await this.RenewNotificationBadge(),
            async () => await dataService.initData(),
          ])(async () => {
            this.load.dismiss();
            // this.event.publish('LoginMayChange', await this.dataService.getUserAuthAsync());
            // this.sideMenus = this.menus.MenuItems;
          });
          this.dataService.FetchAllPodcastInBack();
        }
      );
    });

    event.subscribe('musicPlayChange', (isDisplay: boolean) => {
      this.IsDisplayHeader = isDisplay;
    })
  }

  private async initData() {
    await this.commonService.GetChurchAsync();
    await this.dataService.initData();
    this.load.dismiss();
    // this.event.publish('LoginMayChange', await this.dataService.getUserAuthAsync());
    // this.sideMenus = this.menus.MenuItems;
  }

  private async RenewNotificationBadge() {
    let notifications = await this.dataService.FetchUserNotification();
    console.log(notifications);
    let badge = 0;
    if (notifications != null && notifications.length != null && notifications.length > 0) {
      badge = notifications.filter(b => b.readTime == null).length;
    }
    this.badge.set(badge);
    this.event.publish('RenewBadgeNumber', badge);

  }

  IsDisplayHeader: boolean = false;



}

// export function RegistetPush(push: Push): Promise<PushToken> {
//   return new Promise<PushToken>((resolve, reject) => {
//     push.register().then((t: PushToken) => {
//       return this.push.saveToken(t);
//     }).then((t: PushToken) => {


//       resolve(t);
//     }).catch(e => {
//       // alert(JSON.stringify(e))
//       resolve(null);
//     });
//   });

//   // this.push.rx.notification()
//   //   .subscribe((msg) => {
//   //     alert(msg.title + ': ' + msg.text);
//   //   });
// }
// export function SubscribePush(push:Push){
//   push.rx.notification()
//     .subscribe((msg) => {
//       alert(msg.title + ': ' + msg.text);
//     });
// }


