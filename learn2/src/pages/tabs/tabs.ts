import { Component, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import { CommonService, Church } from '../../providers/common-service';
import { MenuButton } from './tabs-menu-item';
import { TabItems } from './tabs-item';
import { TabItemService } from './tab-item-service';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  items: any;
  church: Church;
  menuItems: MenuButton[] = [];




  scrollableTabsopts: any = {};
  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }

  RenewTable() {
    TabItemService.RefreshVisable(this.menuItems, null);
  }



  constructor(public event: Events, public commonService: CommonService) {
    let tabitem = new TabItems();
    this.menuItems = tabitem.menuItems;
  }
  ngOnInit(): void {
    this.event.subscribe('LoginMayChange', (status) => {
      console.log(`the data start init ${status}`);
    })
  }




}

