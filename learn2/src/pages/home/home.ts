import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonService, Church, DataService } from '../../providers/common-service';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  title: string = this.commonService.title;
  church: Church = new Church();
  data: any[] = [];

  constructor(public navCtrl: NavController, public commonService: CommonService, public dataservice: DataService, public storage: Storage) {
  }

  ngOnInit() {
    this.data = this.dataservice.homePageData;
  }

  showData() {
    console.log(this.data);

  }

}
