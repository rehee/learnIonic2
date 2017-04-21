import { Component, OnInit } from '@angular/core';
import { DataService, CoreFunction } from '../../providers/common-service';
import { PersonModule, PersonOption, PersonOptionKey } from '../../modules/index';
@Component({
    selector: 'my-detail',
    templateUrl: 'my-detail.html'
})

export class MyDetailPage implements OnInit {
    constructor(private dataService: DataService) { }

    async ngOnInit() {
        await this.refresh();
    }

    MyDetail: PersonModule = new PersonModule();
    Gender: PersonOption = new PersonOption();
    Relation: PersonOption = new PersonOption();
    Language: PersonOption = new PersonOption();
    Employee: PersonOption = new PersonOption();
    Nationality: PersonOption = new PersonOption();
    BirthDay: string = "";
    private convertToPerson = CoreFunction.ConvertToOtherObject(PersonModule);
    private convertToOption = CoreFunction.ConvertToOtherObject(
        PersonOption, convertOptionToclass);

    async doRefresh(refresher) {
        await this.refresh();
        refresher.complete();
        this.MyDetail.GENDER;
        this.Gender.options
    }



    private async refresh() {
        let result = await this.dataService.RefreshMyDetail();
        if (result == null) {
            return;
        }
        if (result.status != true) {
            return;
        }
        console.log(result);
        this.MyDetail = this.convertToPerson(result.data.person);
        var options: PersonOption[] = [];
        for (var option in result.data.options) {
            if (result.data.options.hasOwnProperty(option)) {
                options.push(this.convertToOption(result.data.options[option]))
            }
        }
        let filterOption = filterByName(options);
        this.Gender = filterOption("GENDER") != null ? filterOption("GENDER") : this.Gender;
        this.Relation = filterOption("RELATION") != null ? filterOption("RELATION") : this.Gender;
        this.Language = filterOption("LANGUAGE") != null ? filterOption("LANGUAGE") : this.Gender;
        this.Employee = filterOption("EMPLOYMENT") != null ? filterOption("EMPLOYMENT") : this.Gender;
        this.Nationality = filterOption("NATION") != null ? filterOption("NATION") : this.Gender;
        this.BirthDay = getPersonBirthday(this.MyDetail);
        console.log(options);

    }

    async Save(){
        console.log(this.BirthDay);
        var birthDayItems = this.BirthDay.split('-');
        this.MyDetail.DOBDD=birthDayItems[2];
        this.MyDetail.DOBMM=birthDayItems[1];
        this.MyDetail.DOBYYYY=birthDayItems[0];
        console.log(await this.dataService.PostMyDetail(this.MyDetail));
    }
}


function filterByName(input: PersonOption[]) {
    return (filter: string): PersonOption => {
        let options = input.filter(b => b.key == filter);
        return options.length >= 1 ? options[0] : null;
    }
}

function getPersonBirthday(input: PersonModule) {
    return `${input.DOBYYYY}-${input.DOBMM}-${input.DOBDD}`;
}

function convertOptionToclass(f, input) {
    let object: PersonOption = new f();
    object.id = input.id;
    object.key = input.key;
    object.name = input.name;
    for (let key in input.options) {
        if (input.options.hasOwnProperty(key)) {
            let optionKey = new PersonOptionKey();
            optionKey.value = Number(key);
            optionKey.name = input.options[key];
            object.options.push(optionKey);
        }
    }
    return object;
}