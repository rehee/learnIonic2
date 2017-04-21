import { MyNotificationType, MyNotificationItem } from '../../modules/module/index';
export class DataExtend{
    static ConvertObjectToMyNotificationItem(b:any){
        if(b==null){
            return null;
        }
        var item = new MyNotificationItem();
        item.date=b.date;
        item.desc=b.desc;
        item.icon=b.icon;
        item.title=b.title;
        item.type=MyNotificationType[String(b.type)];
        return item;
    }
}