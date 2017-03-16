import { Component, OnInit } from '@angular/core';
import {Content} from'ionic-angular';
// import{CoreService} from '../../../../providers/common-service';
@Component({
    selector: 'home-refresher',
    templateUrl: 'refresher-weidges.html',
    viewProviders:[Content]
})
export class HomeRefreshComponent implements OnInit {
    // async doRefresh(event){
    //     console.log(1);
    //     await this.core.Delay(3000);
    //     event.complete();
    // }
    // private core:CoreService
    constructor() { }
    ngOnInit() { }
}