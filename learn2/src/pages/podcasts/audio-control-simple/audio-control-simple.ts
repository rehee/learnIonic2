import { Component, OnInit } from '@angular/core';
import { CoreFunction, DataService } from '../../../providers/common-service';
import { NavController, Events, NavParams, LoadingController } from 'ionic-angular';

@Component({
    selector: 'audio-control-simple',
    templateUrl: 'audio-control-simple.html'
})

export class AudioControlSimpleComponent {
    constructor(private event: Events, private dataService: DataService) {
        event.subscribe('musicPlayChange', (isPlaying: boolean = true) => {

        })
    }
    Tracks: any[] = [];
    async RefreshTrack() {
        let tracks = await this.dataService.MusicTrack;
        if (tracks == null || tracks.length == 0) {
            this.Tracks = [];
            return;
        }
        this.Tracks = tracks;
    }

}