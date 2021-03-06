import { Injectable } from '@angular/core';
import { Church } from './church';
import { ApiService } from '../api-service/api-service';
import * as ChurchJson from '../../../www/church/church.json';
@Injectable()
export class CommonService {
  ThisChurch: Church = ChurchJson;
  async GetChurchAsync(): Promise<Church> {
    try {
      if (this.ThisChurch != null) {
        return this.ThisChurch;
      }
      let church = ChurchJson;
      if (church != null) {
        this.ThisChurch = church;
      } else {
        console.log('no church files');
        
      }
      return this.ThisChurch;
    } catch (e) {

    }

  }





  title: string = "title";


  // public http: Http
  constructor(public api: ApiService) {
    
  }

}

export enum AppKeyType {
  ApiKey = 0,
  LastUpdateTime = 1,
  IsAuth = 2,
  PplId = 3,
  PushNotificatins = 4
}