import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: 'page-header.html',

})

export class PageHeaderComponent implements AfterViewInit {
    constructor() { }
    @Input() Title: string = "";
    ngAfterViewInit() {
        
    }
}