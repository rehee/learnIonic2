import { Component, OnInit, Input,AfterViewInit } from '@angular/core';

@Component({
    selector: 'img-lazy',
    templateUrl: 'lazy-image.html'
})

export class ImageLazyomponent {
    constructor() { }
    @Input() src;
    loading: boolean = true;
    finish() {
        this.loading = false;
    }
}