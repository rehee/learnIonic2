export class MyNotificationItem {
    date: string;
    desc: string;
    icon: string;
    title: string;
    type: MyNotificationType;
}

export enum MyNotificationType {
    groupEvents = 1,
    rotaReminders = 2,
    teamBirthdays = 3,
    groupBirthdays = 4,
    invitedEvents = 5
}