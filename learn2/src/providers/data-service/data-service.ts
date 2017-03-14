import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';
import { DeviceService, CommonService, AppKeyType } from '../common-service';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(public http: Http, public deviceService: DeviceService, public commonService: CommonService, public storage: Storage) {

  }
  homePageData:any[]=[];


  getStorageKey(key: string): string {
    let appName = "";
    if (this.commonService.ThisChurch != null && this.commonService.ThisChurch.init != null && this.commonService.ThisChurch.init.app_name != null) {
      appName = this.commonService.ThisChurch.init.app_name;
    }
    return `${appName}_${key}`;
  }

  getStoragePromise<T>(key: string) {
    return new Promise<T>((resolve, reject) => {
      this.storage.get(this.getStorageKey(key)).then(
        data => resolve(data),
        error => reject(error)
      );
    })
  }

  async initData() {
    let dateNow = new Date();
    let lastRefreshDate = await this.getStoragePromise(AppKeyType.LastUpdateTime.toString());
    if (lastRefreshDate == null || isNaN(dateNow.getTime() - +lastRefreshDate) || dateNow.getTime() - +lastRefreshDate > 60000) {
      let content = await this.getContentAsync();
      let data = this.analysisHttpBack(content);
      this.saveValueInStore(data);
      return;
    }
    this.refreshPageData();
  }

  async refreshPageData(){
    let homePageData = await this.getStoragePromise<any[]>('home');
    this.homePageData.splice(0,this.homePageData.length);
    for(let item of homePageData){
      this.homePageData.push(item);
    }
  }



  analysisHttpBack(input) {
    let teststring: string = input._body;
    try {
      return JSON.parse(teststring);
    } catch (e) {
      if (teststring == "Invalid KEY") {
        this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), '');
      }
      return null;
    }
  }
  saveValueInStore(data) {
    let date = new Date();
    if (typeof (data.auth) != 'undefined') {
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), data.auth.key)
    }
    this.storage.set(this.getStorageKey(AppKeyType.LastUpdateTime.toString()), date.getTime());
    for (let key in data.data) {
      if (data.data.hasOwnProperty(key)) {
        this.storage.set(this.getStorageKey(key), data.data[key]);
      }
    }
    this.refreshPageData();
  }

  getContentAndStore() {
    this.getStoragePromise(AppKeyType.ApiKey.toString()).then(
      (response: string) => {
        this.getContent(response).subscribe(
          data => this.saveValueInStore(data)
        )
      },
      error => {
        this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), '')
      }
    )
  }


  async getContentAsync() {
    let apiKey = "";
    apiKey = await this.getStoragePromise<string>(AppKeyType.ApiKey.toString());
    if (apiKey == null) {
      apiKey = "";
    }
    let content = await this.getContentPromise(apiKey);
    return content;
  }

  getContentPromise(apiKey: string) {
    return new Promise((resolve, reject) => {
      this.getContent(apiKey).subscribe(
        response => resolve(response),
        error => reject(error)
      )
    });
  }

  getContent(apiKey: string): Observable<any> {
    let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.commonService.ThisChurch.init.base_url + '/app/all',
      JSON.stringify(this.deviceService.getWhoami()),
      options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
