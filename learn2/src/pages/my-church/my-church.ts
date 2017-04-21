import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { DataService, CoreFunction } from '../../providers/common-service';
import { GroupModule, TeamModule, RotaEvents } from '../../modules/module/index';
import { MyTeamPage } from './my-team/my-team';

@Component({
    selector: 'my-church',
    templateUrl: 'my-church.html'
})

export class MyChurchPage {
    constructor(private dataService: DataService, private nav: NavController) { }
    teamModuleClass: any = TeamModule;
    private convertToTeam = CoreFunction.ConvertToOtherObject(this.teamModuleClass, ConvertObjectToTeamModule);

    myGroups: GroupModule[] = [];
    myTeam: TeamModule[] = [];

    async doRefresh(refresher: any) {
        await this.RefreshPage(true);
        refresher.complete();
    }
    async ionViewWillEnter() {
        await this.RefreshPage();
    }

    TurnToMyTeamPage(input: TeamModule) {
        this.nav.push(MyTeamPage, input);
    }


   



    async RefreshPage(fullRefresh: boolean = false) {
        if (fullRefresh) {
            await this.dataService.FetchContentData();
        }
        let obj = await this.dataService.RefreshMyChurch()
        this.myGroups = obj.groups.map(b => { var d = new GroupModule(); d.id = b.id; d.name = b.name; return d; });
        this.myTeam = this.convertToTeam(obj.teams);
        console.log(this.myGroups);
        console.log(this.myTeam);
    }
}

export function ConvertObjectToTeamModule<T>(teamModule, input: Object) {
    let newObjs: TeamModule[] = [];
    for (let key in input) {
        if (input.hasOwnProperty(key)) {
            let newObj: TeamModule = new teamModule();
            newObj.id = input[key].id;
            newObj.name = input[key].name;
            newObj.campus_abbr = input[key].campus_abbr;
            for (let rotaKey in input[key].rota_events) {
                if (input[key].rota_events.hasOwnProperty(rotaKey)) {
                    let newEvent = new RotaEvents();
                    newEvent.team_id = input[key].rota_events[rotaKey].team_id;
                    newEvent.event_id = input[key].rota_events[rotaKey].event_id;
                    newEvent.campus_abbr = input[key].rota_events[rotaKey].campus_abbr;
                    newEvent.event_name = input[key].rota_events[rotaKey].event_name;
                    newEvent.team_name = input[key].rota_events[rotaKey].team_name;
                    newObj.rota_events.push(newEvent);
                }
            }
            newObjs.push(newObj);
        }
    }
    return newObjs;
}