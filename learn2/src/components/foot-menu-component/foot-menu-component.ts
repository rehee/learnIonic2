import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';

import { HomePage, FootMenuPage, MyMessagePage,NestNavPage } from "../../pages/index";

import { CoreFunction } from '../../providers/common-service';
import { DataService, DeviceService, CommonService, AppKeyType, ApiService } from '../../providers/common-service';
@Component({
    selector: 'foot-menu-component',
    templateUrl: 'foot-menu-component.html'
})

export class FootMenuComponent {
    constructor(private event: Events,private dataService:DataService) {
        event.subscribe('RenewBadgeNumber', (badge) => {
            this.NotificationBadge = badge;
        });
        event.subscribe('LoginChange', (status) => {
            this.ShowMessage = status;
        });
        event.subscribe("AppIsRunning",(state)=>{
            this.ShowMessage = state;
        })
    }
    @Input() nav: NavController;
    NotificationBadge: number = 0;
    ShowMessage: boolean = false;
    ngOnChanges() {
        console.log(this.nav);
        this.checkFunction = CoreFunction.IsSamePageCurrentTargetFunction(this.nav);
    }
    ionViewDidEnter() {
       
    }
    checkFunction: (string) => boolean;

    Pages: { [key: string]: any } = {
        ["HomePage"]: HomePage,
        ["FootMenuPage"]: FootMenuPage,
        ["MyMessagePage"]: MyMessagePage
    }



    OpenMenu() {
        if (this.checkFunction("FootMenuPage")) {
            return;
        }
        this.nav.push(this.Pages["FootMenuPage"]);
    }
    OpemPage(page) {
        if (this.checkFunction(page)) {
            return;
        }
        this.nav.setRoot(this.Pages[page], null, { animate: true, direction: 'back' });
    }
    BackToHome() {
        if (this.checkFunction("HomePage")) {
            return;
        }
        this.nav.setRoot(this.Pages["HomePage"], null, { animate: true, direction: 'back' });
    }
}