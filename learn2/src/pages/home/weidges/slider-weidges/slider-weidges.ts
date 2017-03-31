import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CoreService } from '../../../../providers/common-service';
@Component({
    selector: 'home-slider',
    templateUrl: 'slider-weidges.html'
})
export class HomeSliderComponent implements OnInit {
    @ViewChild('bannerSlider') bannerSlider: Slides;
    @Input() data;
    @Input() autoplay: number = 5000;
    slider=[];
    constructor(public core: CoreService) {

    }

    ngOnChanges() {
        
        this.slider=[];
        if(this.data!=null && this.data.data!=null){
            this.slider=this.data.data;
        }
       this.stopAutoplay();
    }
    ngOnInit() {

    }
    async autoSlider() {
        try {
            await this.core.Delay(1000);
            if (!this.bannerSlider.autoplay) {
                this.autoSlider();
            }
            this.bannerSlider.autoplay = this.autoplay;
            this.bannerSlider.stopAutoplay();
            this.bannerSlider.startAutoplay();
        }
        catch(e){

        }
        
    }
    stopAutoplay() {
        this.autoSlider();
    }

}