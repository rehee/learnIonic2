import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutSpinComponent } from './logout-spin/logout-spin'

@Component({
    selector: 'selector',
    templateUrl: 'logout.html'
})
export class LogoutComponent implements OnInit {
    constructor(private controller: NavController, ) { }
    ngOnInit() {
        this.controller.push(LogoutSpinComponent);
    }
}