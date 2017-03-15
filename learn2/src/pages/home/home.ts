import { Component } from '@angular/core';
import { NavController, PopoverController,AlertController } from 'ionic-angular';
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
  loginPop(event) {
    let popover = this.popoverCtrl.create(
      HomeLoginComponent      );
    popover.present({
      ev: event
    });
  }
  
  
   showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type:'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  constructor(public alertCtrl: AlertController,public popoverCtrl: PopoverController, public navCtrl: NavController, public commonService: CommonService, public dataservice: DataService, public storage: Storage) {
  }

  ngOnInit() {
    this.data = this.dataservice.homePageData;
  }

  showData() {
    console.log(this.data);

  }

}
