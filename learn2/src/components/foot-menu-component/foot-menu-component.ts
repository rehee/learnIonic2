import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';

import { HomePage, FootMenuPage } from "../../pages/index";

import { CoreFunction } from '../../providers/common-service';
@Component({
    selector: 'foot-menu-component',
    templateUrl: 'foot-menu-component.html'
})

export class FootMenuComponent {
    constructor() { }
    @Input() nav: NavController;
    ngOnChanges() {
        console.log(this.nav);
        this.checkFunction = CoreFunction.IsSamePageCurrentTargetFunction(this.nav);
    }
    ionViewDidEnter() {

        console.log(1);
    }
    checkFunction = CoreFunction.IsSamePageCurrentTargetFunction(this.nav);

    Pages: { [key: string]: any } = {
        ["HomePage"]: HomePage,
        ["FootMenuPage"]: FootMenuPage,
    }



    OpenMenu() {
        if (this.checkFunction("FootMenuPage")) {
            return;
        }
        this.nav.push(this.Pages["FootMenuPage"]);
    }
    BackToHome() {
        if (this.checkFunction("HomePage")) {
            return;
        }
        this.nav.setRoot(this.Pages["HomePage"], null, { animate: true, direction: 'back' });
    }
}