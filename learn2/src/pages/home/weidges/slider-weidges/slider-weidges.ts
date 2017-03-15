import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
@Component({
    selector: 'home-slider',
    templateUrl: 'slider-weidges.html'
})
export class HomeSliderComponent implements OnInit {
    @ViewChild('bannerSlider') bannerSlider: Slides;
    @Input() data;
    constructor() { 
    }
    
    ngOnChanges(){
        console.log(this.bannerSlider);
        this.bannerSlider.startAutoplay();
        
        console.log(this.bannerSlider.startAutoplay);
    }
    ngOnInit() { 
       
    }
}