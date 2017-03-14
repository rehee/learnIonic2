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

  getChurcnPromis():Promise<Church>{
    return new Promise<Church>((resolve,reject)=>{
      this.getChurch().subscribe(
        response=>resolve(response),
        error=>reject(error)
      )
    })
  }

  getChurch(): Observable<Church> {
    return this.http.get("church/church.json")
      .map((response: Response) =>{this.ThisChurch=<Church>response.json();return this.ThisChurch;} )
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

export enum AppKeyType{
  ApiKey=0,
  LastUpdateTime=1
}