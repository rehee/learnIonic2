import {
    HomePage, AboutPage, ContactPage, LogoutComponent,
    FeaturedPage, CalenderPage, GivePage, PodcastPage, SocialFeedPage, MyAvaliablePage, MyDetailPage, MapPage
} from '../../pages/index';
import {
    PodcastHolderPage
} from '../../pages/podcasts/index';

import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { DeviceService, CommonService, DataService } from '../common-service';
import { MenuItem, MenuList } from './menu-item';
@Injectable()
export class FootMenuService {
    constructor(private device: DeviceService, private data: DataService, private common: CommonService) {

    }


    public async GetMenu(): Promise<MenuItem[]> {
        let menu = await this.common.GetChurchAsync()
        let device = this.device.ThisDevice.platform;
        var isAuth = await this.data.getUserAuthAsync();
        return new Promise<MenuItem[]>((resolve, reject) => {
            try {
                var result = menu.init.menu.public.filter(
                    b => {
                        let deviceDisplay = false;
                        if (device.toLowerCase().indexOf('ios') >= 0) {
                            deviceDisplay = b.ios;
                        }
                        else if (device.toLowerCase().indexOf('android') >= 0) {
                            deviceDisplay = b.android;
                        }
                        let auth = false;
                        if (b.private == false) {
                            auth = true;
                        } else {
                            auth = isAuth;
                        }
                        return (deviceDisplay && auth);
                    })
                    .map<MenuItem>(
                    c => {
                        var menu = MenuList.MenuListItems.filter(m => m.name == c.href);
                        if (menu.length >= 1) {
                            return menu[0];
                        }
                        return null;
                    })
                    .filter(menu => menu != null);

                if (result.length > 0) {
                    resolve(result);
                } else {
                    resolve([]);
                }

            } catch (e) {
                resolve([]);
            }
        });
    }
}