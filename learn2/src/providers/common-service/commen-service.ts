import { Injectable } from '@angular/core';
import { Church } from './church';
import { ApiService } from '../api-service/api-service';

@Injectable()
export class CommonService {
  ThisChurch: Church = null;
  async GetChurchAsync(): Promise<Church> {
    try {
      if (this.ThisChurch != null) {
        return this.ThisChurch;
      }
      let church = await this.api.GetChurchPromise();
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
  constructor(public api: ApiService) { }

}

export enum AppKeyType {
  ApiKey = 0,
  LastUpdateTime = 1,
  IsAuth = 2
}