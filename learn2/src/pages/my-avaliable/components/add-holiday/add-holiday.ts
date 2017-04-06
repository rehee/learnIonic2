import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../providers/common-service';
import { Platform, LoadingController, Events ,NavController } from 'ionic-angular';

@Component({
    selector: 'add-holiday',
    templateUrl: 'add-holiday.html'
})

export class AddHolidayComponent implements OnInit {
    constructor(private loading: LoadingController, private dataService: DataService, private events: Events,private nav:NavController) { }

    min: any;
    max: any;
    Model = {
        title: "",
        startDD: "",
        startMM: "",
        startYYYY: "",
        finishDD: "",
        finishMM: "",
        finishYYYY: "",
    }
    Title: string;
    StartDate: string = new Date().toISOString();
    FinishDate: string = new Date().toISOString();
    addHoliday = this.loading.create({ content: 'Adding Holiday for you...' });
    ngOnInit() {
        this.min = new Date().toISOString();
        this.max = new Date().getFullYear() + 5;
    }
    async save() {
        if (this.Title == null || this.Title.trim() == "") {
            alert("title can not be empty");
            return;
        };
        this.Model.title = this.Title;
        var thisDate: Date = new Date(this.StartDate);
        var thisFinishDate: Date = new Date(this.FinishDate);
        if (thisDate.getTime() >= thisFinishDate.getTime()) {
            alert('finish date must late than start');
            return;
        }
        this.addHoliday.present();
        this.Model.startDD = String(thisDate.getDate());
        this.Model.startMM = String(thisDate.getMonth() + 1);
        this.Model.startYYYY = String(thisDate.getFullYear());

        this.Model.finishDD = String(thisFinishDate.getDate());
        this.Model.finishMM = String(thisFinishDate.getMonth() + 1);
        this.Model.finishYYYY = String(thisFinishDate.getFullYear());
        var result = await this.dataService.AddRefreshMyHoliday(this.Model);
        this.addHoliday.dismiss();
        if (result == null || result.status != true) {
            alert("server error please try later");
            return;
        }
        this.events.publish('holidayHasBeenAdd', true);
        this.nav.popToRoot();
    }
}