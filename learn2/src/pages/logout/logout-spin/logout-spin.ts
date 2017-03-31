import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { HomePage } from '../../index'
@Component({
    selector: 'logout-spin',
    templateUrl: 'logout-spin.html'
})
export class LogoutSpinComponent implements OnInit {
    constructor(private loading: LoadingController, private dataService: DataService, private controller: NavController) { }
    ionViewDidLoad(){
        console.log('ionViewDidLoad');
    }
    ionViewWillEnter(){
        console.log('ionViewWillEnter');
    }
    ionViewDidEnter(){
        console.log('ionViewDidEnter');
    }
    ionViewWillLeave(){
        console.log('ionViewWillLeave');
    }
    ionViewDidLeave(){
        console.log('ionViewDidLeave');
    }
    ionViewWillUnload(){
        console.log('ionViewWillUnload');
    }
    ionViewCanEnter(){
        console.log('ionViewCanEnter');
    }
    ionViewCanLeave(){
        console.log('ionViewCanLeave');
    }
    async ngOnInit() {
        let load = this.loading.create({ content: 'Logout now...' });
        load.present();
        await this.dataService.FetchContentData(true);
        load.dismiss();

        this.controller.popToRoot().then(
            () => {
                this.controller.setRoot(HomePage);
            }
        );
    }
}