import { Component, OnInit, Input } from '@angular/core';
import { CoreFunction } from '../../../providers/common-service';
import { NavController, Events, NavParams, LoadingController } from 'ionic-angular';

@Component({
    selector: 'audio-control',
    templateUrl: 'audio-control.html'
})

export class AudioControlComponent {
    constructor(private event:Events) {

    }
    @Input() Tracks: any[] = [];
    @Input() HideTitle:boolean = false;
    async test(track: any) {
        for (let i = 0; i < 3; i++) {
            await CoreFunction.Delay(1000);
            this.event.publish("musicPlayChange", track.isPlaying);
            console.log(track.isPlaying);
        }

    }
}