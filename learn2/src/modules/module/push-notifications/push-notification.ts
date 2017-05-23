export class PushNotification{
    NotificationDate:Date=new Date();
    NotificationTitle:String="";
    NotificationMessage:string="";
    IsRead:boolean=false;
}
export class PushNotificationRecord{
    notificationId:number=0;
    sendTime:Date;
    readTime:Date;
    title:string="";
    text:string="";
    content:string="";
}