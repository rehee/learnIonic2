import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeSpend'
})

export class TimeSpendPipe implements PipeTransform {
    transform(value: Date, args: any[] = [new Date()]): string {
        if (value == null) {
            return "";
        }
        try {
            
            let checkDate = args[0];
            let spendMs=checkDate.getTime() - value.getTime();
            let spend = spendMs / (1000 * 60 * 60);
            if(isNaN(spend)){
                return "";
            }
            if (spend < 1) {
                return "<1 h"
            }
            if (spend > 1 && spend < 24) {
                return `${Math.round(spend)} h`
            }
            return `${Math.round(spend / 24)} d`
        } catch (e) {
            return "";
        }


    }
}

