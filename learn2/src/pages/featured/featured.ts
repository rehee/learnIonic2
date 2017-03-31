import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/common-service'

@Component({
    selector: 'selector',
    templateUrl: 'featured.html'
})
export class FeaturedPage implements OnInit {
    Data:any[]=[];
    
    constructor(private dataService:DataService) { }
    async ngOnInit() { 
        this.Data = await this.dataService.RefreshFeaturedDate();
    }
}