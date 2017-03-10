import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Church } from './church'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';



/*
  Generated class for the CommenService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {

  constructor(public http: Http) {
    this.getChurch().subscribe(
      response => {
        this.ThisChurch = response;
      }
    )
  }

  ThisChurch: Church = new Church();

  // getContent(): Observable<any> {
  //   let headers = new Headers({'Content-Type':'application/json','know-api-key':''})
  //   return this.http.post(
  //       this.ThisChurch.init.base_url + '/app/all', 
  //       JSON.stringify(this.deviceService.getWhoami()),
  //        headers)
  //     .map((response: Response) => <any>response.json())
  //     .catch(this.handleError);
  // }


  getChurch(): Observable<Church> {
    return this.http.get("church/church.json")
      .map((response: Response) => <Church>response.json())
      .catch(this.handleError)
  }
  thisChurch(): boolean {
    return false;
  }



  getValueFromObservable() {
    let test = new Church();

    this.getChurch().subscribe(tests => { console.log('get json'); test = tests; });
    return test;
  }

  title: string = "title";

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
