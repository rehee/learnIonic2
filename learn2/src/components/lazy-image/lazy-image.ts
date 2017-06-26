import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import {CoreFunction} from '../../providers/common-service';
@Component({
    selector: 'img-lazy',
    templateUrl: 'lazy-image.html'
})

export class ImageLazyomponent {
    constructor() { }
    @Input() src:string="";
    @Input() defaultSrc:string="";
    @Input() delay:number=15;
    loading: boolean = true;
    finish() {
        this.loading = false;
    }
    async timeout(){
        await CoreFunction.Delay(this.delay*1000);
        if(this.loading){
            console.log(this.defaultSrc);
            this.src = this.defaultSrc;
            this.loading = false;
        }
    }
}