import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DeviceService, CommonService, AppKeyType, ApiService } from '../common-service';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(public events: Events,public deviceService: DeviceService, public commonService: CommonService, public storage: Storage, public api: ApiService) {

  }
  homePageData: any[] = [];


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
        error => resolve(null)
      );
    })
  }

  async initData() {
    let dateNow = new Date();
    let lastRefreshDate = await this.getStoragePromise(AppKeyType.LastUpdateTime.toString());
    
    if (lastRefreshDate == null || isNaN(dateNow.getTime() - +lastRefreshDate) || dateNow.getTime() - +lastRefreshDate > 60*10*1000) {
      await this.fetchDataAndRefreshPageAsync();
    }
    this.refreshPageData();
  }


  async FetchContentData(){
    await this.fetchDataAndRefreshPageAsync();
  }

  private async  fetchDataAndRefreshPageAsync() {
    let church = await this.commonService.GetChurchAsync();
    if (church == null) {
      this.refreshPageData();
      return;
    }
    let url = church.init.base_url;
    let content = await this.api.GetContentPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      url, this.deviceService.getWhoami()
    );
    let data = this.analysisHttpBack(content);
    this.saveValueInStore(data);
    return;
  }

  private async refreshPageData() {
    let homePageData = await this.getStoragePromise<any[]>('home');
    this.homePageData.splice(0, this.homePageData.length);
    for (let item of homePageData) {
      this.homePageData.push(item);
    }
  }
  private analysisHttpBack(input) {
    let teststring: string = input._body;
    if (teststring == "Invalid KEY") {
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), '');
      return null;
    }
    try {
      return JSON.parse(teststring);
    } catch (e) {
      if (teststring == "Invalid KEY") {
        this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), '');
      }
      return null;
    }
  }
  private saveValueInStore(data) {
    if (data == null) {
      this.refreshPageData();
      return;
    }
    let receiveDate = new Date();
    if (typeof (data.auth) != 'undefined') {
      this.events.publish('LoginMayChange',data.auth.status);
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), data.auth.key)
    }
    this.storage.set(this.getStorageKey(AppKeyType.LastUpdateTime.toString()), receiveDate.getTime());
    for (let key in data.data) {
      if (data.data.hasOwnProperty(key)) {
        this.storage.set(this.getStorageKey(key), data.data[key]);
      }
    }
    this.refreshPageData();
  }

}
