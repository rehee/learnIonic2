import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { DataService } from '../../../providers/common-service';
import { PushNotificationRecord } from '../../../modules/index';
@Component({
    selector: 'read-message',
    templateUrl: 'read-message.html'
})

export class ReadMessagePage {
    constructor(private parm: NavParams, private nav: NavController,private dataService:DataService,private event:Events) {
        this.Notification = parm.data;
        console.log(this.Notification);
        this.ReadMessage(this.Notification.notificationId);
    }
    
    Notification:PushNotificationRecord=new PushNotificationRecord();

    async ReadMessage(id:number){
        let result = await this.dataService.ReadNotification(id);
        console.log(result);
        if(result!=null){
            this.event.publish("NewNotificationReceive");
        }
        
    }
}