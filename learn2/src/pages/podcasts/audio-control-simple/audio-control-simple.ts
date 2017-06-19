import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CoreFunction, DataService } from '../../../providers/common-service';
import { NavController, Events, NavParams, LoadingController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import { PodcastTrackPage } from '../index';

@Component({
    selector: 'audio-control-simple',
    templateUrl: 'audio-control-simple.html'
})

export class AudioControlSimpleComponent implements AfterViewInit {
    constructor(private event: Events, private dataService: DataService, public audio: AudioProvider) {
        event.subscribe('musicPlayChange', (isPlaying: boolean = true) => {

        });
        event.subscribe('TrackSelected', async () => {
            await this.RefreshTrack();
            this.DisplayController = this.dataService.DisplayMusicController = true;
        })
    }
    DisplayController: boolean = true;
    async ngAfterViewInit() {
        await this.RefreshTrack();
    }
    Tracks: any[] = [];
    async RefreshTrack() {
        let tracks = await this.dataService.MusicTrack;
        this.DisplayController = this.dataService.DisplayMusicController;
        if (tracks == null || tracks.length == 0) {
            this.Tracks = [];
            return;
        }
        this.Tracks = tracks;
    }
    StopAudio() {
        console.log(this.audio);

        try {
            if (this.audio.tracks.length <= 0) {
                return;
            }
            this.audio.tracks[0].pause();
            this.DisplayController = false;
            this.dataService.DisplayMusicController = false;
        }
        catch (e) {

        }

        // console.log(this.audio.tracks[0]);
        // this.audio.tracks[0].stop();
        //this.audio.tracks[0].stop();
        //this.dataService.MusicTrack=[];
        //await this.RefreshTrack();
    }
    async test(track: any) {
        for (let i = 0; i < 3; i++) {
            await CoreFunction.Delay(1000);
            this.event.publish("musicPlayChange", track.isPlaying);
            // console.log(track.isPlaying);
            console.log(this.DisplayController)
        }

    }

}