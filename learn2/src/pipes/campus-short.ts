import { Pipe, PipeTransform,Inject,forwardRef } from '@angular/core';
import { DataService } from '../providers/data-service/data-service';
@Pipe({
    name: 'campusshort'
})

export class CampusShortPipe implements PipeTransform {
    private d:DataService;
    constructor(@Inject(forwardRef(() => DataService)) dataService) {
        this.d = dataService;
    }

    async transform(value:string, ...args: any[]) {
        
        var result = await this.d.FetchTeamCampus(value);
        if(result==null){
            return value;
        }
        return result.campus_name;
    }
}