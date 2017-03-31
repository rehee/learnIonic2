import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'feed-item',
    templateUrl: 'feed-item.html'
})
export class FeedItemComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
    @Input() FeedItem: any = null;

    FeedItemIcon() {
        if (this.FeedItem == null) {
            return "";
        }
        try {
            switch (this.FeedItem.type) {
                case "twitter":
                    return "fa fa-twitter-square";
                case "vimeo":
                    return;
                case "fa fa-vimeo-square":
                    return;
                case "instagram":
                    return "fa fa-instagram";
                case "youtube":
                    return "fa fa-youtube-square";
                case "facebook":
                    return "fa fa-facebook-square";
            }
        } catch (e) { console.log(e); }

        return "fa fa-question-circle";
    }

    TimeSpend(){
        if(this.FeedItem==null || this.FeedItem.date==null){
            return "";
        }
        let date =   new Date(this.FeedItem.date);
        let now = new Date();
        let spend = Math.round((now.getTime()- date.getTime())/(1000*60*60));
        if(spend<1){
            return "<1 h"
        }
        if(spend>1 && spend <24){
            return `${spend} h`
        }
        return `${Math.round(spend/24)} d`

    }
}