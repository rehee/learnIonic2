import { Component, OnInit, OnChanges, Provider } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { DataService } from '../../providers/common-service';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie, Episode, Track } from '../../modules/index';
import { EpisodeComponent } from './index';
import { ApiMedia } from '../../providers/media-service/api-media';
import { AudioProvider } from 'ionic-audio';
import { CoreFunction } from '../../providers/common-service';
import { ImageTo64Service } from '../../pipes/index';
import {WebWorkerService} from 'ng2-image-lazy-load';


@Component({
    selector: 'podcasts',
    templateUrl: 'podcasts.html'
})
export class PodcastPage implements OnInit, OnChanges {
    constructor(private apiMedia: ApiMedia, private dataService: DataService, private nav: NavController, public audioProvider: AudioProvider, private event: Events) {
        event.subscribe('EpisodeSelected', (item: Episode) => this.episodeSelected(item))
    }

    ngAfterContentInit() {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this.audioProvider.tracks;
    }
    async ngOnInit() {
        this.refreshStream();
    }
    myTracks: any[] = [];
    allTracks: any[] = [];
    convertBolb: any = CoreFunction.ConvertUrlToStorageBolb(ImageTo64Service.GetImageDataPromise);
    ngOnChanges() {

    }
    private async episodeSelected(item: Episode) {
        var track: Track = this.apiMedia.ConvertToTrack(item);
        let c = await this.convertBolb('church/t.mp3');
        if (this.audioProvider.tracks.length <= 0) {
            // this.myTracks=track;
            let newTrack = this.audioProvider.create(track);
        }
        if (this.audioProvider.tracks[0].src != track.src) {
            this.audioProvider.tracks[0].stop();
            this.audioProvider.tracks.splice(0, 1);
            let newTrack = this.audioProvider.create(track);
        }

        this.myTracks = this.audioProvider.tracks
    }

    MusicStreams: MusicStream[] = [];
    ThisSerial: MusicSerie[] = [];
    async refreshStream() {
        let streams: Object = await this.dataService.RefreshMediastreams()
        let streamList: MusicStream[] = [];
        let thisSerial: MusicSerie[] = [];
        for (let item in streams) {
            if (streams.hasOwnProperty(item)) {
                streamList.push(streams[item]);

            }
        }
        if (streamList.length > 0) {
            this.MusicStreams = streamList;
            for (let item of streamList) {
                for (let s of item.series) {
                    thisSerial.push(s);
                }
            }

            this.ThisSerial = thisSerial;
        }

    }

    FindEpisode(item: MusicSerie) {
        this.nav.push(EpisodeComponent, { streamId: item.series_stream, seriesId: item.series_id });
    }

    playSelectedTrack() {
        // use AudioProvider to control selected track 
        this.audioProvider.play(0);
    }

    pauseSelectedTrack() {
        // use AudioProvider to control selected track 
        this.audioProvider.pause(0);
    }

    onTrackFinished(track: any) {
        console.log('Track finished', track)
    }
    dosomething(event){
        console.log(event);
    }
}