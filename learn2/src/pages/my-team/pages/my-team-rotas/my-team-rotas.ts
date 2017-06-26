import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { DataService } from '../../../../providers/common-service';
import { MyTeamRotaPage } from '../index';
@Component({
    selector: 'my-team-rotas',
    templateUrl: 'my-team-rotas.html'
})

export class MyTeamRotasPage {
    constructor(private navParm: NavParams, private dataService: DataService, private nav: NavController) {

    }
    Team: any;
    TeamLeaders: TeamLeader[] = [];
    UpcomingEvent: any[] = [];
    Rotas: number = 0;
    DefaultAvata:string="assets/images/default-avata.jpg";
    async ionViewDidLoad() {
        this.Team = this.navParm.data;
        console.log(this.Team);
        if (this.Team != null) {
            this.refreshTeamLeader();
            this.refreshUpcomingEvent();
        }
    }
    GoToRota() {
        this.nav.push(MyTeamRotaPage, this.Team);
    }
    async refreshTeamLeader() {
        let result: any[] = await this.dataService.FetchTeamLeaders(this.Team.id);

        this.TeamLeaders = result.map(b => {
            let a = b;
            let name: string = `${b.ppl_fname} ${b.ppl_sname}`;
            let image: string = '';
            switch (b.ppl_img_pref) {
                case 'facebook':
                    image = b.ppl_facebook_img;
                    break;
                case 'twitter':
                    image = b.ppl_twitter_img;
                    break;
                default:
                    image = b.ppl_iknow_img;
                    break;
            }
            if (image == null || image == "null" || image.trim() == "") {
                image=this.DefaultAvata;
            }
            return new TeamLeader(name, image);
        });
        console.log(this.TeamLeaders);
    }
    async refreshUpcomingEvent() {
        let result: any[] = await this.dataService.FetchTeamUpcomingEvents(this.Team.id);
        this.UpcomingEvent = result;
        console.log(result);
        this.Rotas = (await this.dataService.FetchTeamRotas(this.Team.id)).length;
    }
}

export class TeamLeader {
    Name: string;
    Image: string;
    constructor(name: string = '', img: string = '') {
        this.Name = name;
        this.Image = img;
    }
}