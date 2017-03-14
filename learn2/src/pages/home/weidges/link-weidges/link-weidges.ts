import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'home-link',
    templateUrl: 'link-weidges.html'
})
export class HomeLinkComponent implements OnInit {
    constructor() { }
    @Input() data;
    ngOnInit() { }
}