import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CommonService, Church } from '../../providers/common-service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  title: string = this.commonService.title;
  church: Church = new Church();

  constructor(public navCtrl: NavController, public commonService: CommonService,public storage:Storage) {

    this.commonService.getChurch()

      .subscribe(
      response => {
        this.title = response.church.name;
        this.church = response
      },
      error => console.log(error));
      storage.ready().then(()=>{
        storage.get('appName').then((val)=>{
          console.log(val);
        })
        
      });

  }

  getJSON(input): string {
    console.log(input);
    return "(input)";
  }


}
