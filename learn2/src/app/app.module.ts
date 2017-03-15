import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CommonService, DeviceService, DataService, CoreService } from '../providers/common-service';

import { IonicStorageModule } from '@ionic/storage';
import { ScrollableTabs } from '../components/scroll-tab/scrollable-tabs'

import { CloudSettings, CloudModule } from '@ionic/cloud-angular'
import { HomeBlockComponent, HomeLinkComponent, HomeVoteComponent, HomeSliderComponent,HomeLoginComponent } from '../pages/home/weidges/index';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b3dcf650',
  },
  'push': {
    'sender_id': '670965791919',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeBlockComponent,
    HomeLinkComponent,
    HomeVoteComponent,
    HomeSliderComponent,
    HomeLoginComponent,
    TabsPage,
    ScrollableTabs,

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeLoginComponent,
    TabsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, CommonService, DeviceService, DataService, CoreService
  ]
})
export class AppModule {

}
