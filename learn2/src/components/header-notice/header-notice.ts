import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { CoreFunction, DataService } from '../../providers/common-service';

@Component({
    selector: 'header-notice',
    templateUrl: 'header-notice.html'
})

export class HeaderNoticeComponent {
    constructor(private event: Events, private dataService: DataService) {
        event.subscribe('musicPlayChange', (isPlaying: boolean = true) => {
            this.IsMusicPlaying = isPlaying;
            this.doMusicLoopSearch(isPlaying);
        })
    }
    IsMusicPlaying: boolean = false;

    private keepSearch: boolean = false;
    myTracks:any[]=[];
    private async doMusicLoopSearch(isPlaying: boolean) {
        if (isPlaying == false) {
            this.keepSearch == false;
            return;
        }
        if (this.keepSearch) {
            return;
        }
        this.keepSearch = true;
        while (this.IsMusicPlaying) {
            await CoreFunction.Delay(1000);
            let music = this.dataService.MusicTrack;
            
            if (music == null || music.length == 0) {
                this.IsMusicPlaying = false;
            } else {
                this.myTracks=music;
                this.IsMusicPlaying = music[0].isPlaying;
            }
        }
        this.keepSearch = false;
        this.event.publish("musicPlayChange", false);
    }
}