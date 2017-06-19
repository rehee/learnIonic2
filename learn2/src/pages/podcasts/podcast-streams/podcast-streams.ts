import { Component } from '@angular/core';
import { NavParams, LoadingController, NavController } from 'ionic-angular';
import { MusicStream } from '../../../modules/index';
import { DataService } from '../../../providers/common-service';
import { PodcastPage } from '../podcasts';

@Component({
    selector: 'podcast-streams',
    templateUrl: 'podcast-streams.html'
})

export class PodcastStreamPage {

    load = this.loading.create({ content: 'Loading...' });
    constructor(private parms: NavParams, private dataService: DataService, private loading: LoadingController, private nav: NavController) {
        this.Stream = parms.data
        console.log(this.Stream);

    }
    Stream: MusicStream[] = [];
    async doRefresh(refresher:any){
        this.Stream= await this.dataService.FetchMediaStream();
        refresher.complete();
    }
    async GoToStreamPage(streamId: number) {
        // this.load.present();
        // let streamDetail = await this.dataService.GetMediaStreamById(streamId);
        // this.load.dismiss();
        this.nav.push(PodcastPage,streamId);
    }
}