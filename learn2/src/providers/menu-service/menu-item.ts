import {
    HomePage, AboutPage, ContactPage, MenuButton, LogoutComponent,
    FeaturedPage, CalenderPage, GivePage, PodcastPage, SocialFeedPage, MyAvaliablePage, MyDetailPage, MapPage, MyChurchPage
} from '../../pages/index';
// import{
//     NotificationPage
// }from '../../pages/index2';
import { NotificationPage } from '../../pages/notification/notification';
// import{
//     MyChurchPage
// } from '../../pages/my-church/my-church';
export class MenuItem {
    page: any;
    text: string;
    name: string;
    icon: string;
    display: boolean;
}

export class MenuList {
    private static homePage: any = HomePage;
    private static aboutPage: any = AboutPage;
    private static contactPage: any = ContactPage;
    private static logoutPage: any = LogoutComponent;
    private static featuredPage: any = FeaturedPage;
    private static calenderPage: any = CalenderPage;
    private static givePage: any = GivePage;
    private static podcastPage: any = PodcastPage;
    private static socialFeedPage: any = SocialFeedPage;
    private static myAvaliablePage: any = MyAvaliablePage;
    private static myDetailPage: any = MyDetailPage;
    private static mapPage: any = MapPage;
    private static myChurch: any = MyChurchPage;
    private static notificationPage: any = NotificationPage;

    static MenuListItems: MenuItem[] = [
        {
            page: MenuList.homePage,
            text: "Home",
            name: 'home',
            icon: 'home',
            display: true
        },
        {
            page: MenuList.featuredPage,
            text: "Featured",
            name: 'featured',
            icon: 'bookmark',
            display: true
        }
        ,
        {
            page: MenuList.notificationPage,
            text: "Notifications",
            name: 'notifications',
            icon: 'medical',
            display: true
        },
        {
            page: MenuList.myChurch,
            text: "My Church",
            name: 'church',
            icon: 'people',
            display: true
        },
        {
            page: MenuList.calenderPage,
            text: "What's On",
            name: 'calendar',
            icon: 'calendar',
            display: true
        },
        {
            page: MenuList.givePage,
            text: "Give",
            name: 'give',
            icon: 'card',
            display: true
        },
        {
            page: MenuList.aboutPage,
            text: "Prayer",
            name: 'prayer',
            icon: 'chatbubbles',
            display: true
        }
        ,
        {
            page: MenuList.podcastPage,
            text: "Podcasting",
            name: 'podcasts',
            icon: 'logo-youtube',
            display: true
        }
        ,
        {
            page: MenuList.socialFeedPage,
            text: "Social Feed",
            name: 'socialfeed',
            icon: 'logo-rss',
            display: true
        }
        ,
        {
            page: MenuList.aboutPage,
            text: "Tickets",
            name: 'tickets',
            icon: 'pricetag',
            display: true
        },
        {
            page: MenuList.mapPage,
            text: "Map",
            name: 'map',
            icon: 'navigate',
            display: true
        }
        ,
        {
            page: MenuList.myDetailPage,
            text: "My Details",
            name: 'mydetails',
            icon: 'plane',
            display: true
        }
        ,
        {
            page: MenuList.myAvaliablePage,
            text: "My Availability",
            name: 'holidays',
            icon: 'person',
            display: true
        }
        ,
        {
            page: MenuList.aboutPage,
            text: "App Settings",
            name: 'settings',
            icon: 'settings',
            display: true
        }
        ,
        {
            page: MenuList.aboutPage,
            text: "About",
            name: 'about',
            icon: 'information-circle',
            display: true
        }
        ,
        {
            page: MenuList.logoutPage,
            text: "Logout",
            name: 'logout',
            icon: 'power',
            display: true
        }
    ]

}