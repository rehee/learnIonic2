import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'home-block',
    templateUrl: 'block-weidges.html'
})
export class HomeBlockComponent implements OnInit {
    @Input() data;
    constructor() { }
    ngOnInit() { }
}