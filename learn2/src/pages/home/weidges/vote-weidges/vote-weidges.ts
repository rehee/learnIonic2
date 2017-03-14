import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'home-vote',
    templateUrl: 'vote-weidges.html',
    
})
export class HomeVoteComponent implements OnInit {
    @Input() data;
    
    constructor() { }

    ngOnInit() { }

}