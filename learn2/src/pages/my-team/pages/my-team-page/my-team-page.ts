import { Component } from '@angular/core';
// import { CalendarComponent } from 'ionic2-calendar/calendar';
// import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { DataService } from '../../../../providers/common-service';
import { NavController } from 'ionic-angular';
import { MyTeamRotasPage } from '../index';
import { MyTeamGroupJoinPage } from '../../../index';
@Component({
    selector: 'my-team-page',
    templateUrl: 'my-team-page.html'
})

export class MyTeamManagePage {
    constructor(private dataService: DataService, private nav: NavController) {

    }

    Campus: any[] = [];
    async ionViewWillEnter() {
        let team: any[] = [];
        team = await this.dataService.RefreshMyTeam();
        let campus: string[] = [];
        team.forEach(b => {
            if (campus.indexOf(b.campus_abbr) < 0) {
                campus.push(b.campus_abbr);
            }
        });
        this.Campus = [];
        campus.forEach(async (b) => {
            let camp: any = {};
            camp.campName = b;
            camp.teams = team.filter(c => c.campus_abbr == b);
            this.Campus.push(camp);
        })
    }
    JoinTeam(){
        this.nav.push(MyTeamGroupJoinPage, 'team');
    }
    async ToRotasPage(item) {
        this.nav.push(MyTeamRotasPage, item)
        // console.log(await this.dataService.FetchTeamDetail(id));
        // console.log(await this.dataService.FetchTeamRotas(id));
        // console.log(await this.dataService.FetchTeamUpcomingEvents(id));
    }
}