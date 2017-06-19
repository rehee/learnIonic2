import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie, Episode, Track } from '../../../modules/index';
import { DataService } from '../../../providers/common-service';
import { ApiMedia } from '../../../providers/media-service/api-media';
import { AudioProvider } from 'ionic-audio';
@Component({
    selector: 'track-page',
    templateUrl: 'track-page.html'
})

export class PodcastTrackPage {
    constructor(private nav: NavController, private parms: NavParams, private dataService: DataService, public audioProvider: AudioProvider, private apiMedia: ApiMedia, private events: Events) {

    }
    async ionViewWillEnter() {
        if (this.parms.data == null || typeof (this.parms.data) == "undefined") {
            return;
        }
        if (typeof (this.parms.data) == "number") {
            return;
        }
        this.SelectEpisode = this.parms.data;
        this.myTracks = this.dataService.MusicTrack;
        console.log(this.myTracks);
        this.PlaySelectTrack();
    }
    SelectEpisode: Episode = new Episode();
    myTracks: any[];
    async PlaySelectTrack() {
        if (this.SelectEpisode.episode_localurl == null || this.SelectEpisode.episode_localurl.trim() == "") {
            return;
        }
        await this.episodeSelected(this.SelectEpisode);
        this.events.publish('TrackSelected');
    }

    private async episodeSelected(item: Episode) {

        var track: Track = this.apiMedia.ConvertToTrack(item);
        if (this.audioProvider.tracks.length <= 0) {
            // this.myTracks=track;
            let newTrack = this.audioProvider.create(track);
            this.audioProvider.tracks[0].play();
        }
        if (this.audioProvider.tracks[0].src != track.src) {
            this.audioProvider.tracks[0].stop();
            this.audioProvider.tracks.splice(0, 1);
            let newTrack = this.audioProvider.create(track);
            this.audioProvider.tracks[0].play();
        } else {
            if (this.audioProvider.tracks[0].isPlaying == false) {
                this.audioProvider.tracks[0].play();
            }

        }
        this.dataService.MusicTrack = this.audioProvider.tracks;
        this.myTracks = this.dataService.MusicTrack;
    }
}