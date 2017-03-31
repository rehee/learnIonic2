import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/common-service';
@Component({
    selector: 'social-feed',
    templateUrl: 'social-feed.html'
})
export class SocialFeedPage implements OnInit {
    constructor(private dataService: DataService) { }
    async ngOnInit() {
        await this.refresh();
    }

    Medias: any[] = [];
    async refresh(fullRefresn: boolean = false) {
        if (fullRefresn) {
            await this.dataService.FetchContentData();
        }
        this.Medias = await this.dataService.RefreshSocialFeed();
    }

    async doRefresh(event) {
        await this.refresh(true);
        event.complete();
    }
}