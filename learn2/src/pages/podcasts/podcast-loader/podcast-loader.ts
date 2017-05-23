import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'podcast-loader',
    templateUrl: 'podcast-loader.html'
})

export class PodcastLoaderPage {
    load = this.loading.create({ content: 'Loading...' });
    constructor(private loading: LoadingController) {
        
    }
    ionViewWillEnter(){
        this.load.present();
    }
    ionViewDidLeave(){
        this.load.dismiss();
    }
}