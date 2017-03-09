import { Injectable } from '@angular/core';
import { Http, Response ,Headers ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import{DeviceService,CommonService}from '../common-service';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(public http: Http,public deviceService:DeviceService,public commonService:CommonService) {
    
  }

 getContent(): Observable<any> {
    let headers = new Headers({"Content-Type":"application/json","iknow-api-key":""})
    let options = new RequestOptions({ headers: headers });
    console.log(this.deviceService.getWhoami());
    return this.http.post(
        this.commonService.ThisChurch.init.base_url + '/app/all', 
        JSON.stringify(this.deviceService.getWhoami()),
         options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
