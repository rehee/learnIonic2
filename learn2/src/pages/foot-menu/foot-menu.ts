import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController, Events, } from 'ionic-angular';
import { CalenderPage } from '../../pages/index';
import { DataService } from '../../providers/common-service';
import { FootMenuService } from '../../providers/menu-service/foot-menu-service';

import { StatusBar, Splashscreen } from 'ionic-native';

import { Storage } from '@ionic/storage';
// import { TabsPage } from '../pages/tabs/tabs';
import { Device } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';

import { HomePage, LogoutComponent } from '../../pages/index';

@Component({
    selector: 'foot-menu',
    templateUrl: 'foot-menu.html'
})
// ,private nav: NavController
export class FootMenuPage {
    constructor(private menuservice: FootMenuService, private nav: NavController,private data:DataService,private loading: LoadingController) { }
    home:any =HomePage;
    sideMenus: any[] = [];
    menus: any[];
    async ionViewWillEnter() {
        this.menus = await this.menuservice.GetMenu();
    }

    async GoToPage(item: any) {
        let page:any = item.page;
        if (item.page == LogoutComponent) {
            let load = this.loading.create({ content: 'Logout now...' });
            load.present();
            await this.data.FetchContentData(true);
            load.dismiss();
            page= this.home;
            
        } else {
            
        }
        this.nav.setRoot(page,null,{animate: true, direction: 'forward'});
    }
}