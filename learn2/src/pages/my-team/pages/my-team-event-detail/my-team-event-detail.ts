import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { DataService } from '../../../../providers/common-service';
@Component({
    selector: 'my-team-event-detail',
    templateUrl: 'my-team-event-detail.html'
})

export class MyTeamEventDetailPage {
    constructor(private parm: NavParams, private dataService: DataService) { }
    Team: any = null;
    ChurchEvent: any = null;
    async ionViewWillEnter() {
        this.Team = this.parm.get('team');
        this.ChurchEvent = this.parm.get('event');
        console.log(this.ChurchEvent);
    }
    CurrentEvent: any = null;
    CurrentRoles:any=null;
    async Refresh() {
        this.CurrentEvent = await this.dataService.fetchCalEventByTeamAndEvent(
            this.Team.team_id, this.ChurchEvent.event_id
        );
        
    }
}