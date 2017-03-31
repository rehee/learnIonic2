import { Component, OnInit } from '@angular/core';
import { ModalController, ViewController, NavParams,NavController } from 'ionic-angular';
import { CalendarEventInfo } from '../../calendar';
@Component({
    selector: 'calendar-event',
    templateUrl: 'calendar-event.html'
})
export class CalendarEventWeidge implements OnInit {
    EventDate:string ="";
    Event:string[]=[];
    Back(){
        this.nav.pop();
    }
    constructor(private viewControl: ViewController, private navParams: NavParams,private nav:NavController) { }
    ngOnInit() {
        let parm:CalendarEventInfo =this.navParams.data;
        this.EventDate= `${parm.EventDate.getDate()}/${parm.EventDate.getMonth()+1}/${parm.EventDate.getFullYear()}`;
        for(let item of parm.Events){
            this.Event.push(item);
        }
    }
}