import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { DataService } from '../../../../providers/common-service';
import { MyTeamEventDetailPage } from '../index';
@Component({
    selector: 'my-team-rota',
    templateUrl: 'my-team-rota.html'
})

export class MyTeamRotaPage {
    constructor(private dataService: DataService, private navParm: NavParams, private nav: NavController) {

    }
    Team: any = null;
    Rotas: any[] = [];
    async ionViewDidLoad() {
        this.Team = this.navParm.data;
        console.log(this.Team);
        if (this.Team != null) {
            this.refreshTeamRota();
        }
    }

    async refreshTeamRota() {
        let result = await this.dataService.FetchTeamRotas(this.Team.id);
        this.Rotas = result;
        console.log(result);
    }

    async EventDetail(item: any) {
        // console.log(item);
        // console.log(await this.dataService.fetchCalEventByTeamAndEvent(
        //     item.team_id, item.event_id
        // ));
        this.nav.push(MyTeamEventDetailPage, { team: this.Team, event: item });

    }

}