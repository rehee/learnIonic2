import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {
  FeaturedPage, CalenderPage, GivePage,
  PodcastPage,
  SocialFeedPage, MyAvaliablePage, AddHolidayComponent, MyDetailPage, MapPage, FootMenuPage, MyChurchPage,
  MyTeamPage, RotaPage, RoteItemComponent, NotificationPage, CalendarNativePage, MyMessagePage, ReadMessagePage, NestNavPage, HomeTabs
} from '../pages/index';
import { FeedItemComponent } from '../pages/social-feed/index';
import { CalendarEventWeidge } from '../pages/calendar/weidges/index';
import { LogoutComponent } from '../pages/index';
import { ImageLazyomponent, FootMenuComponent, MenuItemComponent, HeaderNoticeComponent, PageHeaderComponent } from '../components/index';
import { CoreService, ApiService, CommonService, DeviceService, DataService, FootMenuService, ApiMedia } from '../providers/common-service';
import { MenuItems } from '../providers/menu-service/menu-service';
import { IonicStorageModule } from '@ionic/storage';
import { ScrollableTabs } from '../components/scroll-tab/scrollable-tabs'

import { CloudSettings, CloudModule } from '@ionic/cloud-angular'
import { HomeBlockComponent, HomeLinkComponent, HomeVoteComponent, HomeSliderComponent, HomeLoginComponent, HomeRefreshComponent, HomeLoginPrompComponent } from '../pages/home/weidges/index';
import { LogoutSpinComponent } from '../pages/logout/logout-spin/logout-spin'
import { SafeHtmlPipe, AppCurrencyPipe, ImageSrcSavePipe, TimeSpendPipe, StringToTimePipe, CampusShortPipe } from '../pipes/index'
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EpisodeComponent, PodcastLoaderPage, PodcastStreamPage, PodcastHolderPage, PodcastTrackPage, AudioControlComponent, AudioControlSimpleComponent } from '../pages/podcasts/index';
import { IonicAudioModule } from 'ionic-audio';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { Badge } from '@ionic-native/badge';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';


import { MyTeamManagePage, MyTeamRotasPage, MyTeamRotaPage,MyTeamGroupJoinPage,MyTeamEventDetailPage } from '../pages/index';
import { NgCalendarModule } from 'ionic2-calendar';
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
    HomeLoginComponent, HomeRefreshComponent, HomeLoginPrompComponent, HeaderNoticeComponent, PageHeaderComponent,
    ScrollableTabs,
    LogoutComponent, LogoutSpinComponent,
    FeaturedPage,
    SafeHtmlPipe, AppCurrencyPipe, ImageSrcSavePipe, TimeSpendPipe, StringToTimePipe, CampusShortPipe,
    CalenderPage, CalendarEventWeidge,
    GivePage,
    PodcastPage, EpisodeComponent, PodcastLoaderPage, PodcastStreamPage, PodcastHolderPage, PodcastTrackPage, AudioControlComponent, AudioControlSimpleComponent,
    SocialFeedPage, FeedItemComponent, ImageLazyomponent,
    MyAvaliablePage, AddHolidayComponent,
    MyDetailPage,
    MapPage,
    FootMenuPage, FootMenuComponent, MenuItemComponent,
    MyChurchPage, MyTeamPage, RotaPage, RoteItemComponent,
    NotificationPage, CalendarNativePage,
    MyMessagePage, ReadMessagePage,
    NestNavPage, HomeTabs,
    MyTeamManagePage, MyTeamRotasPage,MyTeamRotaPage,MyTeamGroupJoinPage,MyTeamEventDetailPage
  ],
  imports: [
    NgCalendarModule,
    CommonModule, FormsModule,
    NgbModalModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    CalendarModule.forRoot(),
    IonicAudioModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5THjfwM4qdgplcilYPv_hV-idRSvBe5o'
    })


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeLoginComponent,
    LogoutComponent, LogoutSpinComponent,
    FeaturedPage,
    CalenderPage, CalendarEventWeidge,
    GivePage, PodcastPage, EpisodeComponent, PodcastLoaderPage, PodcastStreamPage, PodcastHolderPage, PodcastTrackPage,
    SocialFeedPage, MyAvaliablePage, AddHolidayComponent,
    MyDetailPage,
    MapPage, FootMenuPage,
    MyChurchPage, MyTeamPage, RotaPage,
    NotificationPage, CalendarNativePage,
    MyMessagePage, ReadMessagePage,
    NestNavPage, HomeTabs,
    MyTeamManagePage, MyTeamRotasPage,MyTeamRotaPage,MyTeamGroupJoinPage,MyTeamEventDetailPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    FootMenuService, ApiService, ApiMedia, CommonService, DeviceService, DataService, CoreService, Badge, InAppBrowser
  ]
})
export class AppModule {

}


