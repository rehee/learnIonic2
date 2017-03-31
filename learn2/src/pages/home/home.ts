import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CommonService, Church, DataService } from '../../providers/common-service';

import { Storage } from '@ionic/storage';
import { HomeLoginComponent } from './weidges/index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  title: string = this.commonService.title;
  church: Church = new Church();
  data: any[] = [];
  isAuth: boolean = false;
  loginPop(event) {
    let popover = this.popoverCtrl.create(
      HomeLoginComponent);
    popover.present({
      ev: event
    });
  }

  async doRefresh(refresher) {
    await this.dataservice.FetchContentData();
    let data = await this.dataservice.refreshPageData();
    this.data = data.map(d => d);
    refresher.complete();
  }

  constructor(public event: Events, public popoverCtrl: PopoverController, public navCtrl: NavController, public commonService: CommonService, public dataservice: DataService, public storage: Storage) {
    event.subscribe('LoginMayChange', (status) => {
      this.isAuth = status;
    })
  }

  async ngOnInit() {
    let data = await this.dataservice.refreshPageData();
    if (data == null) {
      await this.dataservice.FetchContentData();
      data = await this.dataservice.refreshPageData();
    }
    if (data != null) {
      this.data = data.map(d => d);
    }
    this.isAuth = await this.dataservice.getUserAuthAsync();

  }

  showData() {
    console.log(this.data);

  }

}
