import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
    selector: 'home-login',
    templateUrl: 'login-weidges.html'
})
export class HomeLoginComponent implements OnInit {
    close() {
        this.viewCtrl.dismiss();
    }
    constructor(public viewCtrl: ViewController) { }
    ngOnInit() { }
}