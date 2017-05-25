import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: 'page-header.html',

})

export class PageHeaderComponent {
    constructor() { }
    @Input() Title: string = "";

}