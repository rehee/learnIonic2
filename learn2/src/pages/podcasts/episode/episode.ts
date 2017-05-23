import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie, Episode } from '../../../modules/index';
import { ApiMedia } from '../../../providers/media-service/api-media';
import { PodcastTrackPage } from '../index';
@Component({
    selector: 'podcast-episode',
    templateUrl: 'episode.html'
})
export class EpisodeComponent {
    constructor(private apiMedia: ApiMedia, private dataService: DataService, private nav: NavController, private parm: NavParams, private event: Events) {

    }

    myTracks: any[];
    async ionViewWillEnter() {
        this.myTracks = this.dataService.MusicTrack;
        await this.Refresh()
    }

    displayTrackTitle:boolean=true;

    Close() {
        this.nav.pop();
    }
    MusicDetail: MusicSerieEpisodeResponse = null;
    async Refresh() {
        let streamID: number = this.parm.get("streamId");
        let seriesId: number = this.parm.get("seriesId");
        let response: MusicSerieEpisodeResponse = await this.dataService.GetMediaSerial(streamID, seriesId);
        response.data.episodes
        this.MusicDetail = response;
        console.log(response);
    }
    SelectMusic(item: Episode) {
        // this.event.publish('EpisodeSelected', item);
        // this.nav.pop();
        //console.log(item);
        this.nav.push(PodcastTrackPage, item);
    }

}