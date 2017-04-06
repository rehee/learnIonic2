import { Component, OnInit } from '@angular/core';
import { NavController ,Events } from 'ionic-angular';
import { DataService } from '../../providers/common-service';
import { AddHolidayComponent } from './components/index';
@Component({
    selector: 'my-avaliable',
    templateUrl: 'my-avaliable.html'
})

export class MyAvaliablePage implements OnInit {
    constructor(private dataService: DataService, private nav: NavController,private event:Events) { 
        event.subscribe(
            'holidayHasBeenAdd',()=>this.refresh());
    }

    async ngOnInit() {
        this.refresh();
    }
    async doRefresh(refresher) {
        await this.refresh();
        refresher.complete();
    }

    Holidays: any[] = [];
    async refresh(fullRefresh: boolean = false) {
        let result = await this.dataService.RefreshMyHoliday();
        console.log(result);
        if (result == null) {
            return;
        }

        this.Holidays = result.data.holidays.map(b => b);
    }

    AddHoliday(){
        this.nav.push(AddHolidayComponent);
    }
    async delete(id:any){
        var c = window.confirm('do you confirm to delete?');
        if(c!=true){
            return;
        }
        await this.dataService.DeleteRefreshMyHoliday(id);
        this.refresh();
    }
}