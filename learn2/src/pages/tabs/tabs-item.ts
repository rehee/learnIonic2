import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MenuButton } from './tabs-menu-item';

export class TabItems {
    homePage: any = HomePage;
    aboutPage: any = AboutPage;
    contactPage: any = ContactPage;

    menuItems: MenuButton[] = [
    {
      page: this.homePage,
      text: "Home",
      name: 'home',
      icon: 'home',
      display: true
    },
    {
      page: this.aboutPage,
      text: "Featured",
      name: 'featured',
      icon: 'bookmark',
      display: true
    }
    ,
    {
      page: this.aboutPage,
      text: "Notification",
      name: 'notification',
      icon: 'medical',
      display: true
    },
    {
      page: this.aboutPage,
      text: "My Church",
      name: 'mychurch',
      icon: 'people',
      display: true
    },
    {
      page: this.aboutPage,
      text: "What's On",
      name: 'whatson',
      icon: 'calendar',
      display: true
    },
    {
      page: this.aboutPage,
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
      page: this.aboutPage,
      text: "Podcasting",
      name: 'podcasting',
      icon: 'logo-youtube',
      display: true
    }
    ,
    {
      page: this.aboutPage,
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
    } ,
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
      text: "My Avaliable",
      name: 'myavaliable',
      icon: 'person',
      display: true
    }
    ,
    {
      page: this.aboutPage,
      text: "App Setting",
      name: 'appsetting',
      icon: 'settings',
      display: true
    }
    ,
    {
      page: this.aboutPage,
      text: "About",
      name: 'About',
      icon: 'information-circle',
      display: true
    }
    ,
    {
      page: this.aboutPage,
      text: "Logout",
      name: 'Logout',
      icon: 'power',
      display: true
    }
    
  ];
}