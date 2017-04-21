import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { PassRotaModule } from '../view-module/pass-rota-module';
import { RotaModule, RoteItem, RoteUnit } from '../view-module/rota-module';
@Component({
    selector: 'rota-page',
    templateUrl: 'rota-page.html'
})

export class RotaPage {
    constructor(private nav: NavController, private parm: NavParams, private dataService: DataService) { }
    PassModule: PassRotaModule = new PassRotaModule();
    RotaInfomation: RotaModule[] = [];
    async ionViewWillEnter() {
        await this.Refresh();
    }
    async doRefresh(input) {
        await this.Refresh();
        input.complete();

    }
    async Refresh() {
        this.PassModule = this.parm.data;
        let result = await this.dataService.GetRote(this.PassModule.additionalUrl);
        if (result == null || result.status != true) {
            return;
        }
        this.RotaInfomation = ConvertRotaModule(result.data);
        console.log(this.RotaInfomation);
    }
}

function ConvertRotaModule(input: any) {
    let rotaList: RotaModule[] = [];
    for (let key in input) {
        if (input.hasOwnProperty(key)) {
            var rota = new RotaModule();
            rota.date = input[key].date;
            for (let unit in input[key].roles) {
                if (input[key].roles.hasOwnProperty(unit)) {
                    rota.roles[unit] = input[key].roles[unit].map(b => {
                        let roteUnit = new RoteUnit();
                        roteUnit.cal_date = b.cal_date;
                        roteUnit.cal_id = b.cal_id;
                        roteUnit.person_id = b.person_id;
                        roteUnit.ppl_fname = b.ppl_fname;
                        roteUnit.ppl_sname = b.ppl_sname;
                        roteUnit.role = b.role;
                        return roteUnit;
                    });
                    
                }
            }
            rotaList.push(rota);
        }

    }
    return rotaList;
}