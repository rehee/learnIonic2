import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'img-lazy',
    templateUrl: 'lazy-image.html'
})

export class ImageLazyomponent implements OnInit {
    constructor() { }
    ngOnInit() { }
    @Input() src;
    loading: boolean = true;
    finish() {
        this.loading = false;
    }
}