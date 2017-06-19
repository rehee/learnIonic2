import { Component, OnInit, OnChanges, Provider } from '@angular/core';
import { NavController, Events, NavParams, LoadingController, InfiniteScroll } from 'ionic-angular';
import { DataService } from '../../providers/common-service';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie, Episode, Track } from '../../modules/index';
import { EpisodeComponent } from './index';
import { ApiMedia } from '../../providers/media-service/api-media';
import { AudioProvider } from 'ionic-audio';
import { CoreFunction } from '../../providers/common-service';
import { ImageTo64Service } from '../../pipes/index';
import { WebWorkerService } from 'ng2-image-lazy-load';


@Component({
    selector: 'podcasts',
    templateUrl: 'podcasts.html'
})
export class PodcastPage {
    constructor(private apiMedia: ApiMedia, private dataService: DataService, private nav: NavController, public audioProvider: AudioProvider, private event: Events, private parms: NavParams, private loading: LoadingController) {
        event.subscribe('EpisodeSelected', (item: Episode) => this.episodeSelected(item))
        this.seasonId = parms.data;
    }
    load = this.loading.create({ content: 'Loading...' });
    ngAfterContentInit() {
        this.allTracks = this.audioProvider.tracks;
    }
    seasonId: number = 0;
    myTracks: any[];
    allTracks: any[] = [];
    convertBolb: any = CoreFunction.ConvertUrlToStorageBolb(ImageTo64Service.GetImageDataPromise);


    ionViewWillEnter() {
        this.myTracks = this.dataService.MusicTrack;
    }

    private async episodeSelected(item: Episode) {

        var track: Track = this.apiMedia.ConvertToTrack(item);
        if (this.audioProvider.tracks.length <= 0) {
            // this.myTracks=track;
            let newTrack = this.audioProvider.create(track);
        }
        if (this.audioProvider.tracks[0].src != track.src) {
            this.audioProvider.tracks[0].stop();
            this.audioProvider.tracks.splice(0, 1);
            let newTrack = this.audioProvider.create(track);
        }

        this.dataService.MusicTrack = this.audioProvider.tracks;
        this.myTracks = this.dataService.MusicTrack;
    }

    MusicStreams: MusicStream[] = [];
    ThisSerial: MusicSerie[] = [];
    AllSerial: MusicSerie[] = [];
    PageSize: number = 10;
    CurrentPage: number = 1;
    Title: string = 'Stream';
    async doRefresh(refresher: any) {
        let result: MusicStream;
        // result = await this.dataService.FetchGetMediaStreamById(this.seasonId);

        await this.refreshStream(true);
        refresher.complete();
    }
    async refreshStream(fullrefresh: boolean = false) {


        let result: MusicStream;
        if (fullrefresh) {
            result = await this.dataService.FetchGetMediaStreamById(this.seasonId);
        } else {
            this.load.present();
            result = await this.dataService.GetMediaStreamById(this.seasonId);
            this.load.dismiss();
        }
        try {
            this.Title = result.stream_title;
            this.AllSerial = result.series;
            this.CurrentPage = 1;
            this.ThisSerial = this.AllSerial.filter(b => this.AllSerial.indexOf(b) < this.CurrentPage * this.PageSize);
        }
        catch (e) {

        }
        // let series = result.series.sort((a, b) => {
        //     let firstDate = new Date(a.latest_episode_date).getTime();
        //     let lastDate = new Date(b.latest_episode_date).getTime();
        //     if (isNaN(firstDate)) {
        //         firstDate = 0;
        //     }
        //     if (isNaN(lastDate)) {
        //         lastDate = 0;
        //     }
        //     return -(firstDate - lastDate);
        // })

        return true;
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
        console.log('pause');
    }
    async test(track: any) {
        for (let i = 0; i < 3; i++) {
            await CoreFunction.Delay(1000);
            //console.log(track);
            this.event.publish("musicPlayChange", track.isPlaying);
            console.log(track.isPlaying);
        }
    }
    onTrackFinished(track: any) {
        this.event.publish("musicPlayChange", false);
        console.log('Track finished', track)
    }
    dosomething(event) {
        console.log(event);
    }
    async ionViewDidLoad() {
        await this.refreshStream();
    }

    ScrollIsFinished(): boolean {
        if (this.CurrentPage * this.PageSize > this.AllSerial.length) {
            return true;
        }
        return false;
    }

    async doInfinite(infinit: InfiniteScroll) {
        await CoreFunction.Delay(1000);
        if (this.CurrentPage * this.PageSize > this.AllSerial.length) {
            infinit.complete();
            return;
        }
        let start = this.CurrentPage * this.PageSize;
        let finish = (this.CurrentPage + 1) * this.PageSize;
        let newList = this.AllSerial.filter(b => {
            let index = this.AllSerial.indexOf(b);
            if (index >= start && index < finish) {
                return true;
            } else {
                return false;
            }
        });
        newList.forEach(b => this.ThisSerial.push(b));
        this.CurrentPage++;
        infinit.complete();
    }
}