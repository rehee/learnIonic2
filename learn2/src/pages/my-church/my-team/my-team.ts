import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupModule, TeamModule, RotaEvents } from '../../../modules/module/index';
import { AppConfig } from '../../../modules/index';
import {RotaPage} from '../rota-page/rota-page';
import { PassRotaModule } from '../view-module/pass-rota-module';

@Component({
    selector: 'my-team',
    templateUrl: 'my-team.html'
})

export class MyTeamPage {
    constructor(private nav: NavController, private parm: NavParams) { }
    thisTeam: TeamModule = new TeamModule();
    ionViewWillEnter() {
        this.RefreshPage();
        console.log(this.thisTeam);
    }
    ToRota(input: RotaEvents) {
        var passModule= new PassRotaModule();
        passModule.additionalUrl=AppConfig.RotaAdditionalUrl(input.team_id,input.event_id);
        passModule.teamName=this.thisTeam.name;
        passModule.rotaName=input.event_name;

        this.nav.push(RotaPage,passModule);
    }
    doRefresh(refresher) {
        refresher.complete();
    }
    RefreshPage(isFullRefresh: boolean = false) {

        this.thisTeam = this.parm.data;
    }

}