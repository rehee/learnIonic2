import { Component, OnInit } from '@angular/core';
import { DataService, CoreFunction } from '../../providers/common-service';
import { MyNotificationType, MyNotificationItem } from '../../modules/module/index';
import {DateExtent}from '../../pipes/string-to-time';
@Component({
    selector: 'notification-page',
    templateUrl: 'notification.html'
})

export class NotificationPage implements OnInit {
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.NotificationSelect.push(new SelectTagsItem(true, MyNotificationType.groupEvents, 'fa-coffee'));
        this.NotificationSelect.push(new SelectTagsItem(true, MyNotificationType.rotaReminders, 'fa-clock-o'));
        this.NotificationSelect.push(new SelectTagsItem(true, MyNotificationType.invitedEvents, 'fa-calendar'));
    }
    async ionViewWillEnter() {
        this.RefreshPage();

    }
    NotificationSelect: SelectTagsItem[] = [];
    DataList: MyNotificationItem[] = [];
    Width:number = Math.round(3/100); 
    async doRefresh(refresher) {
        await this.RefreshPage(true);
        refresher.complete();
    }
    DisplayList:MyNotificationListIten[]=[];
    async RefreshPage(fullRefresh: boolean = false) {
        if (fullRefresh) {
            await this.dataService.FetchContentData();
        }
        let data: MyNotificationItem[] = await this.dataService.RefreshMyNotification();
        if (data != null && data.length > 0) {
            this.DataList = data;
        }
        console.log(data);
        this.DisplayList=this.GetDisplayList();
    }
    ChangeType(input: SelectTagsItem) {
        input.Selected = !input.Selected;
        this.DisplayList=this.GetDisplayList();
    }
    GetDisplayList(): MyNotificationListIten[] {
        return this.DataList
            .filter(
            b => this.NotificationSelect.filter(n => n.Selected == true).map(b => b.Type).indexOf(b.type) >= 0
            )
            .map(b => new MyNotificationListIten(b.date, b.icon, b.title, b.desc));
    }


}

export class MyNotificationListIten {
    Date: string;
    Icon: string;
    Title: string;
    Desc: string;
    TimeRemain:number;
    TimeRemainNumber:string;
    TimeRemainTitle:string;
    constructor(date: string, icon: string, title: string, desc: string) {
        this.Date = date;
        this.Icon = icon;
        this.Title = title;
        this.Desc = desc;

        if(this.Date==null){
            this.TimeRemain= 0;
        }
        let now = new Date().getTime();
        let time =DateExtent.ConvertStringToDate(this.Date).getTime();
        this.TimeRemain=time - now;
        let hours = this.TimeRemain/1000/60/60;
        if(hours<1){
            this.TimeRemainNumber='< 1';
            this.TimeRemainTitle="Hour";
            
        }
        if(hours>=1&&hours<24){
            this.TimeRemainNumber=String(Math.round(hours));
            this.TimeRemainTitle="Hours";
        }
        if(hours>24){
            let days = hours/24;
            if(days<2){
                this.TimeRemainNumber=String(Math.round(1));
                this.TimeRemainTitle="Day";
            }else{
                this.TimeRemainNumber=String(Math.round(days));
                this.TimeRemainTitle="Days";
            }
            
        }

    }
}



export class SelectTagsItem {
    Selected: boolean;
    Type: MyNotificationType;
    Icon: string
    constructor(select: boolean, type: MyNotificationType, icon: string) {
        this.Selected = select;
        this.Type = type;
        this.Icon = icon;
    }
}
