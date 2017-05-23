import { Component, ViewChild } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { PodcastLoaderPage, PodcastStreamPage } from '../index';
import { PodcastPage } from '../podcasts';
@Component({
    selector: 'podcast-holder',
    templateUrl: 'podcast-holder.html'
})
export class PodcastHolderPage {
    constructor(private dataservice: DataService) {
        dataservice.GetMediaStream().then(b => {
            if (b.length > 1) {
                this.nav.setRoot(PodcastStreamPage, b);
            }
            else if (b.length == 1) {
                this.nav.setRoot(PodcastPage, b[0].stream_id);
            }
        });
    }
    rootPage: any = PodcastLoaderPage;
    @ViewChild('podcast') nav: NavController


}