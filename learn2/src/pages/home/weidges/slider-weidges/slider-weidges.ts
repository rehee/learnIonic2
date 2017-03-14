import { Component, OnInit, Input } from '@angular/core';
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
    
    
    ngOnInit() { this.bannerSlider.startAutoplay();}
}