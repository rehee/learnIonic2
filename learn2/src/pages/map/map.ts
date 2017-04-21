import { Component } from '@angular/core';
import { DataService ,CommonService } from '../../providers/common-service';

@Component({
    selector: 'map',
    templateUrl: 'map.html'
})

export class MapPage {
    constructor(private dataService:DataService,private common:CommonService) { }
    title: string = 'My first angular2-google-maps project';
    lat: number = 51.678418;
    lng: number = 7.809007;

    ionViewDidLoad(){
        this.refresh();
    }
    async refresh() {
        var church = await this.common.GetChurchAsync();
        this.lat= +church.church.lat;
        this.lng= +church.church.lng;
    }
}