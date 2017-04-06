import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../providers/common-service';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  constructor(private navCtrl: NavController,private dataservice:DataService) {

  }
  AppInformation:any;
  Church:any;
  async ngOnInit(){
    this.AppInformation = await this.Refresh();
    this.Church = this.GetChurch();
    console.log(this.Church)
  }
  async doRefresh(refresher:any){
    this.AppInformation = await this.Refresh(true);
    refresher.complete();
  }

  GetChurch(){
    return this.dataservice.Church();
  }
  async Refresh(fullRefresh:boolean=false){
    if(fullRefresh){
      await this.dataservice.FetchContentData();
    }
    return await this.dataservice.RefresAppInformation();
  }

}
