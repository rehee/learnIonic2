import { Component } from '@angular/core';
import { DataService } from '../../providers/common-service';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';
import { MyNotificationType, MyNotificationItem, PushNotificationRecord } from '../../modules/module/index';
import { ReadMessagePage } from '../index';
@Component({
    selector: 'my-message',
    templateUrl: 'my-message.html'
})

export class MyMessagePage {
    constructor(private dataService: DataService, private event: Events, private nav: NavController,private loading:LoadingController) {
        event.subscribe("NewNotificationReceive", () => {
            this.refreshPage(true);
        })
    }

    async ionViewDidLoad() {
        await this.refreshPage();
    }
    messages: PushNotificationRecord[] = [];
    async doRefresh(refresher: any) {
        refresher.complete();
        await this.refreshPage(true);
    }

    async refreshPage(fullRefresh: boolean = false) {
        if (fullRefresh) {
            let result = await this.dataService.FetchUserNotification();
        };
        let messageResult = await this.dataService.RefreshNotification();
        if (messageResult == null) {
            return;
        }
        console.log(messageResult);
        this.messages = messageResult.sort(
            (b, c) => {
                return -(b.sendTime.getTime() - c.sendTime.getTime());
            });
        this.event.publish('RenewBadgeNumber', this.messages.filter(b => b.readTime == null).length);

    }
    ReadNotification(item: PushNotificationRecord) {
        this.nav.push(ReadMessagePage, item);
    }
    async RemoveNotification(item: PushNotificationRecord) {
        let load = this.loading.create({ content: 'Removing...' });
        load.present();
        let result = await this.dataService.RemoveNotification(item.notificationId);
        console.log(result);
        if (result == null) {
            alert("system error, please try again later");
            load.dismiss();
            return;
        } 
        await this.refreshPage(true);
        load.dismiss();
    }
}