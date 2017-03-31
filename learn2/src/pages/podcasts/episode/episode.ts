import { Component, OnInit } from '@angular/core';
import { NavController, NavParams ,Events} from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie,Episode } from '../../../modules/index';
import { ApiMedia } from '../../../providers/media-service/api-media';
@Component({
    selector: 'podcast-episode',
    templateUrl: 'episode.html'
})
export class EpisodeComponent implements OnInit {
    constructor(private apiMedia: ApiMedia, private dataService: DataService, private nav: NavController, private parm: NavParams,private event:Events) {

    }
    async ngOnInit() {
        this.Refresh()
    }

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
    }
    SelectMusic(item:Episode) {
        this.event.publish('EpisodeSelected', item);
        this.nav.pop();
    }

}