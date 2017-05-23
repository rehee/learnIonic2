import { Component } from '@angular/core';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';
import { DataService } from '../../providers/common-service';
import { Badge } from '@ionic-native/badge';
@Component({
    selector: 'calendar-native',
    templateUrl: 'calendar-native.html'
})

export class CalendarNativePage {
    constructor(private dataService:DataService,private event:Events,private badge:Badge) { 
        event.subscribe('NewNotification',async ()=>{
            let result = await this.dataService.FetchUserNotification();
            
        });
    }

    async show(){
        let result = await this.dataService.FetchUserNotification();
        if(result!=null && result.length>0){
            alert(JSON.stringify(result));
        }
        alert(JSON.stringify(result));
    }

    async clear(){
        this.badge.set(0);
    }

}