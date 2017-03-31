import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig, IknowApiCall, HttpType } from '../../modules/index';
import { MusicStream, MusicSerieEpisodeResponse, MusicSerie, Episode, Track } from '../../modules/index';
import { CoreFunction } from '../core-service/core-function';
@Injectable()
export class ApiMedia {
    ConvertToTrack(item: Episode): Track {
        if (item == null) {
            return null;
        }
        let track: Track = new Track();
        try {
            track.src = item.episode_localurl;
            track.artist = item.author;
            track.title = item.episode_title;
            track.art = ""
            track.preload = 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
            return track;
        }
        catch (e) { return null; }
    }
    GetMediaPromise(apiKey: string, url: string="", streamId: number=0, seriesId: number=0): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            CoreFunction.GetHttpObservable(
                this.http, HttpType.Get,
                AppConfig.GetApiUrl(IknowApiCall.GetMediaStreams, url, `/${streamId}/${seriesId}`),
                null, CoreFunction.GetIknowOption(apiKey)
            ).subscribe(
                response => resolve(response),
                error => resolve(null)
                )
        })
    }
    constructor(private http: Http) { }
}