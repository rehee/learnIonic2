import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService, CoreFunction } from '../../providers/common-service';
import { GroupModule, TeamModule, RotaEvents } from '../../modules/module/index';
import { ConvertObjectToTeamModule } from '../../pages/my-church/my-church';
import { NavController, PopoverController } from 'ionic-angular';
import { MyTeamPage } from '../../pages/index';

import { trigger,state,style,transition,animate } from '@angular/core';
@Component({
    selector: 'menu-item',
    templateUrl: 'menu-item-component.html',
    animations: [
        trigger('listItemState', [
            state('in',
                style({
                    opacity: 1,
                    height:'*',
                    minHeight: '*'
                })
            ),
            transition('* => void', [
                animate('0.25s 10 ease-out', style({
                    opacity: 0,
                    height: '1px',
                    minHeight: '1px'
                  }))
            ])
        ])
    ]
})

export class MenuItemComponent {
    constructor(private dataService: DataService,private nav:NavController) { }
    @Input() page: any;
    @Output() pageClick = new EventEmitter();
    display: boolean = false;
    Myteam: TeamModule[] = [];
    private convertToTeam = CoreFunction.ConvertToOtherObject(TeamModule, ConvertObjectToTeamModule);
    async GoToPage(item: any) {
        if (item.name != "church") {
            this.pageClick.emit(item);
            return;
        }
        if (!this.display) {
            let result = await this.dataService.RefreshMyChurch();
            this.Myteam = this.convertToTeam(result.teams);
        }else{
            this.Myteam.splice(0,this.Myteam.length);
        }
        console.log(this.Myteam);
        this.display = !this.display;
    }

    TurnToPage(item: any) {
        this.pageClick.emit(item);
    }
    TurnToMyTeamPage(input: TeamModule) {
        this.nav.push(MyTeamPage, input);
    }
    ChangeDisplay() {
        this.display = !this.display;
    }
}