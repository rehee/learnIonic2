import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
@Component({
    selector: 'my-team-group-join',
    templateUrl: 'my-team-group-join.html'
})

export class MyTeamGroupJoinPage {
    constructor(private nav:NavController,private parms:NavParams) { }
    JoinType:string="";
    
    ionViewDidLoad(){
        switch(String(this.parms.data).toLowerCase()){
            case "group":
                this.JoinType ="Group";
                break;
            default:
                this.JoinType = "Team";
                break;
        }
        
    }

}