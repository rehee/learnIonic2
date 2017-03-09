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
      text: "HOME",
      name: 'home',
      icon: 'string',
      display: true
    },
    {
      page: this.aboutPage,
      text: "ABOUT",
      name: 'about',
      icon: 'string',
      display: true
    },
    {
      page: this.contactPage,
      text: "CONTACT",
      name: 'contact',
      icon: 'string',
      display: true
    },
    {
      page: this.homePage,
      text: "HOME",
      name: 'home',
      icon: 'string',
      display: true
    },
    {
      page: this.aboutPage,
      text: "ABOUT",
      name: 'about',
      icon: 'string',
      display: false
    },
    {
      page: this.contactPage,
      text: "CONTACT",
      name: 'contact',
      icon: 'string',
      display: true
    },
    {
      page: this.homePage,
      text: "HOME",
      name: 'home',
      icon: 'string',
      display: false
    },
    {
      page: this.aboutPage,
      text: "ABOUT",
      name: 'about',
      icon: 'string',
      display: false
    },
    {
      page: this.contactPage,
      text: "CONTACT",
      name: 'contact',
      icon: 'string',
      display: false
    },
     {
      page: this.contactPage,
      text: "111",
      name: 'contact',
      icon: 'string',
      display: true
    },
    {
      page: this.contactPage,
      text: "222",
      name: 'contact',
      icon: 'string',
      display: true
    },
    {
      page: this.contactPage,
      text: "333",
      name: 'contact',
      icon: 'string',
      display: true
    },
  ];
}