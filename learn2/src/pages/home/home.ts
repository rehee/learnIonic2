import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CommonService, Church, DataService, AppKeyType,CoreFunction } from '../../providers/common-service';

import { Storage } from '@ionic/storage';
import { HomeLoginComponent } from './weidges/index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public event: Events, public popoverCtrl: PopoverController, public navCtrl: NavController, public commonService: CommonService, public dataservice: DataService, public storage: Storage) {
    event.subscribe('LoginChange', (status) => {
      this.isAuth = status;
      this.NeedLogin=!status;
    })
  }
  async ionViewDidEnter() {
    let auth:boolean = null;
    let count:number=0;
    while(auth==null){
      count++;
      auth = await this.dataservice.getStoragePromise<boolean>(AppKeyType.IsAuth.toString());
      if(auth!=null){
        break;
      }
      await CoreFunction.Delay(100);
      if(count>60){
        auth=false;
      }
    }
    this.isAuth=auth;
    this.NeedLogin=!auth;
    this.event.publish('AppIsRunning',auth);
  }
  async ngOnInit() {
    // await this.refreshPage(false);
  }
  ionViewDidLoad() {
    this.refreshPage(false);
  }
  title: string = this.commonService.title;
  church: Church = new Church();
  data: any[] = [];
  isAuth: boolean = true;
  NeedLogin:boolean=false;

  loginPop(event) {
    let popover = this.popoverCtrl.create(
      HomeLoginComponent);
    popover.present({
      ev: event
    });
  }

  async doRefresh(refresher) {
    await this.refreshPage(true);
    refresher.complete();
  }

  async refreshPage(refreshData: boolean = false) {
    if (refreshData) {
       await this.dataservice.FetchContentData();
    }
    this.isAuth = await this.dataservice.getUserAuthAsync();
    this.NeedLogin = !this.isAuth;
    let data = await this.dataservice.refreshPageData();
    if (data != null) {
      this.data = data.map(d => d);
    }

  }



  async testStream(){
    console.log(await this.dataservice.GetMediaStream());
  }
  async testStreamId(id:number){
    console.log(await this.dataservice.GetMediaStreamById(id));
  }
  async testStreamIdEpsole(id:number,epsole:number){
    console.log(await this.dataservice.GetMediaStreamByIdEpsoId(id,epsole));
  }
  showData() {
    console.log(this.data);

  }

}
