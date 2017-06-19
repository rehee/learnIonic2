import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewComponent } from 'angular-calendar';

import { DataService } from '../../providers/common-service';
import { NavController } from 'ionic-angular';
import { CalendarEventWeidge } from './weidges/index';
const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
@Component({
    selector: 'my-calendar',
    templateUrl: 'calendar.html'
})
export class CalenderPage implements OnInit {

    view: string = 'month';

    viewDate: Date = new Date();

    modalData: {
        action: string,
        event: CalendarEvent
    };
    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal, private dataService: DataService, private nav: NavController) { }
    async ngOnInit() {
        await this.refreshEvent();
    }

    private async refreshEvent() {
        try {
            let events: CalendarEvent[] = [];
            let event = await this.dataService.RefeshWhatIsOn();
            if (event == null) {
                return;
            }
            for (let month in event) {
                let thisMonth = month.substr(0, 2);
                let thisYear = month.substr(2, 2);
                // console.log(`${thisMonth},${thisYear}`);
                if (event.hasOwnProperty(month)) {
                    for (let item in event[month]) {
                        if (event[month].hasOwnProperty(item)) {
                            for (let index of event[month][item]) {
                                events.push(
                                    this.convertApiEventToCalendarEvent(
                                        thisYear, thisMonth, item, index
                                    )
                                );
                            }
                        }
                    }
                }
                this.events = events;
            }
        } catch (e) {
        }
    }

    private convertApiEventToCalendarEvent(thisYear: string, thisMonth: string, thisDay: string, input: any): CalendarEvent {
        let eventTime: string = String(input.time);
        let eventHours = +eventTime.substring(0, 2);
        let eventMins = +eventTime.substring(2, 2);
        let timeSwitch = "am";
        if (eventHours > 12) {
            timeSwitch = "pm";
            eventHours = eventHours - 12;
        }
        let calEven: CalendarEvent = {
            start: new Date(`20${thisYear}-${thisMonth}-${thisDay}`),
            end: new Date(`20${thisYear}-${thisMonth}-${thisDay}`),
            title: `${eventHours}:${eventMins} ${timeSwitch} ${input.title} (${input.campus}) `,
            color: colors.red,
            actions: null,
        }
        return calEven
    }

    dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {

        if (events == null || events.length == 0) {
            return;
        }
        var eventPass = new CalendarEventInfo();
        for (let item of events) {
            eventPass.Events.push(item.title);
        }
        eventPass.EventDate = date;
        this.nav.push(CalendarEventWeidge, eventPass);
    }
}

export class CalendarEventInfo {
    EventDate: Date = new Date();
    Events: string[] = [];
}