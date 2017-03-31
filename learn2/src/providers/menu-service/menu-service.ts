import {
    HomePage, AboutPage, ContactPage, MenuButton,LogoutComponent,
    FeaturedPage,CalenderPage,GivePage,PodcastPage,SocialFeedPage
} from '../../pages/index';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { DeviceService, CommonService } from '../common-service';
@Injectable()
export class MenuItems {
    constructor(private event: Events, private device: DeviceService, private common: CommonService) {
        event.subscribe('LoginMayChange', (status: boolean) => {
            this.changeMenuDisplay(status);
        })
    }
    private homePage: any = HomePage;
    private aboutPage: any = AboutPage;
    private contactPage: any = ContactPage;
    private logoutPage:any =LogoutComponent;
    private featuredPage:any =FeaturedPage;
    private calenderPage:any = CalenderPage;
    private givePage:any = GivePage;
    private podcastPage:any =PodcastPage;
    private socialFeedPage:any =SocialFeedPage;
    
    private changeMenuDisplay(status: boolean) {
        try {
            let menu = this.common.ThisChurch.init.menu;
            let device = this.device.ThisDevice.platform;
            this.MenuItems.splice(0, this.MenuItems.length);
            for(let item of menu.public){
                let deviceDisplay = false;
                if(device.toLowerCase().indexOf('ios')>=0){
                    deviceDisplay = item.ios;
                }
                else if(device.toLowerCase().indexOf('android')>=0){
                    deviceDisplay=item.android;
                }
                let auth = false;
                if(item.private==false){
                    auth = true;
                }else{
                    auth = status;
                }
                if(deviceDisplay&&auth){
                   for(let menuItem of this.menuItems){
                       if(menuItem.name == item.href){
                           this.MenuItems.push(menuItem);
                       }
                   } 
                }
            }


        }
        catch(e){

        }
        
    }


    MenuItems: MenuButton[] = [];

    private menuItems: MenuButton[] = [
        {
            page: this.homePage,
            text: "Home",
            name: 'home',
            icon: 'home',
            display: true
        },
        {
            page: this.featuredPage,
            text: "Featured",
            name: 'featured',
            icon: 'bookmark',
            display: true
        }
        ,
        {
            page: this.contactPage,
            text: "Notifications",
            name: 'notifications',
            icon: 'medical',
            display: true
        },
        {
            page: this.aboutPage,
            text: "My Church",
            name: 'church',
            icon: 'people',
            display: true
        },
        {
            page: this.calenderPage,
            text: "What's On",
            name: 'calendar',
            icon: 'calendar',
            display: true
        },
        {
            page: this.givePage,
            text: "Give",
            name: 'give',
            icon: 'card',
            display: true
        },
        {
            page: this.aboutPage,
            text: "Prayer",
            name: 'prayer',
            icon: 'chatbubbles',
            display: true
        }
        ,
        {
            page: this.podcastPage,
            text: "Podcasting",
            name: 'podcasts',
            icon: 'logo-youtube',
            display: true
        }
        ,
        {
            page: this.socialFeedPage,
            text: "Social Feed",
            name: 'socialfeed',
            icon: 'logo-rss',
            display: true
        }
        ,
        {
            page: this.aboutPage,
            text: "Tickets",
            name: 'tickets',
            icon: 'pricetag',
            display: true
        },
        {
            page: this.aboutPage,
            text: "Map",
            name: 'map',
            icon: 'navigate',
            display: true
        }
        ,
        {
            page: this.aboutPage,
            text: "My Details",
            name: 'mydetails',
            icon: 'plane',
            display: true
        }
        ,
        {
            page: this.aboutPage,
            text: "My Availability",
            name: 'holidays',
            icon: 'person',
            display: true
        }
        ,
        {
            page: this.aboutPage,
            text: "App Settings",
            name: 'settings',
            icon: 'settings',
            display: true
        }
        ,
        {
            page: this.aboutPage,
            text: "About",
            name: 'about',
            icon: 'information-circle',
            display: true
        }
        ,
        {
            page: this.logoutPage,
            text: "Logout",
            name: 'logout',
            icon: 'power',
            display: true
        }

    ];
}