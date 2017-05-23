import { Component, OnInit } from '@angular/core';
import { HomePage,NestNavPage,FootMenuPage } from '../index';
@Component({
    selector: 'home-tabs',
    templateUrl: 'home-tabs.html'
})

export class HomeTabs {
    constructor() { }
    homePage: any = HomePage;
    nest:any=NestNavPage;
    menu:any = FootMenuPage;

}