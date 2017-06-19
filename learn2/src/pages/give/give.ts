import { Component, OnInit, OnChanges } from '@angular/core';
// import {Platform, Page} from 'ionic-framework/ionic';
import { DataService, AppKeyType, DeviceService } from '../../providers/common-service';
import { GiveModule, GivingFIrstSubmit, GiveIknow, GivingSecondSubmit } from '../../modules/index';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import Player from '@vimeo/player';

// import * as cordova from 'cordova';
@Component({
    selector: 'give',
    templateUrl: 'give.html'
})
export class GivePage {
    constructor(private dataService: DataService, private alert: AlertController, private iab: InAppBrowser, private deviceservice: DeviceService) {

    }
    GivingUrl: string = "";


    async ionViewWillEnter() {
        this.GivingUrl = await this.dataService.GetGivingUrl();
        // let player = new Player('made-in-ny', {
        //     id: 59777392,
        //     width: 300,
        //     byline:false,
        //     portrait:false,

        // });
        // console.log(player);
        // cordova.InAppBrowser.open(this.GivingUrl, '_system');
    }

    MakeDonation() {
        let target: string = "_blank";
        if (this.deviceservice.ThisDevice.platform.toLocaleLowerCase().indexOf('ios') >= 0) {
            target = '_system';
        }
        let browser = this.iab.create(this.GivingUrl,
            target
        );
        browser.show();
    }
    playvideo() {
        let option: string = "";
        if (this.deviceservice.ThisDevice.platform.toLocaleLowerCase().indexOf('ios') >= 0) {
            option = 'location=no,hardwareback=yes,closebuttoncaption=CLOSE';
        }
        let browser = this.iab.create(
            'https://player.vimeo.com/video/187528888',
            '_blank',
            option
        );
        browser.show();
    }


}
export enum GiveStage {
    Start = 1,
    MakeDonation = 2,
    InputDetail = 3,
    Varify = 4
}