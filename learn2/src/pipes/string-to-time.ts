import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringToTime'
})

export class StringToTimePipe implements PipeTransform {
    transform(value: string, args: any[]): any {
        return DateExtent.ConvertStringToDate(value);
    }
}
export class DateExtent {
    static ConvertStringToDate(value: string): Date {
        try {
            let date = new Date(value);
            if (!isNaN(date.getDate())) {
                return date;
            }
            let dateStrings: string[] = value.split(' ');
            if (dateStrings.length == 2) {
                let checkDate = new Date(`${dateStrings[0]}T${dateStrings[1]}Z`);
                if (!isNaN(checkDate.getDate())) {
                    return checkDate;
                }
            }
        } catch (e) {

        }
        return new Date();
    }
}