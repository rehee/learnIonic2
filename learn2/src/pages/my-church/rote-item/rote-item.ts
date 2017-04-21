import { Component, OnChanges, Input } from '@angular/core';
import { RoteItem,RotaModule } from '../view-module/rota-module';

@Component({
    selector: 'rote-item',
    templateUrl: 'rote-item.html'
})

export class RoteItemComponent {
    constructor() {

    }
    @Input() Rota: RotaModule = new RotaModule();
    RolesName(key: string) {
        try {
            var rote = this.Rota.roles[key][0];
            if (rote == null) {
                return "";
            }
            return `${rote.ppl_fname} ${rote.ppl_sname}`;
        } catch (e) {
            return "";
        }

    }
}