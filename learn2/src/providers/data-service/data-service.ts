import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DeviceService, CommonService, AppKeyType, ApiService } from '../common-service';
import { ApiMedia } from '../media-service/api-media';
import { GiveModule, GivingFIrstSubmit, GivingSecondSubmit, GiveIknow } from '../../modules/index';
import { Church } from '../common-service/church';
/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(public apiMedia: ApiMedia, public events: Events, public deviceService: DeviceService, public commonService: CommonService, public storage: Storage, public api: ApiService) {

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

  async getUserAuthAsync() {
    let auth: boolean = false;
    auth = await this.getStoragePromise<boolean>(AppKeyType.IsAuth.toString());
    if (auth == null) {
      auth = false;
    }
    return auth;
  }

  async initData() {
    let dateNow = new Date();
    let lastRefreshDate = await this.getStoragePromise(AppKeyType.LastUpdateTime.toString());
    if (lastRefreshDate == null || isNaN(dateNow.getTime() - +lastRefreshDate) || dateNow.getTime() - +lastRefreshDate > 60 * 10 * 1000) {
      await this.fetchDataAndRefreshPageAsync();
    }
    this.refreshPageData();
  }


  async FetchContentData(isLogout: boolean = false) {
    if (isLogout) {
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), null);
    }
    await this.fetchDataAndRefreshPageAsync(isLogout);
    await this.refreshPageData();
  }

  private async  fetchDataAndRefreshPageAsync(isLogout: boolean = false) {
    let church = await this.commonService.GetChurchAsync();
    if (church == null) {
      this.refreshPageData();
      return;
    }
    let url = church.init.base_url;
    let content = await this.api.GetContentPromise(
      await this.getStoragePromise<any>(AppKeyType.ApiKey.toString()),
      url, this.deviceService.getWhoami(), isLogout
    );
    if (content == null) {
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), null);
      return;
    }
    this.saveValueInStore(this.analysisHttpBack(content));
    return;
  }

  async PostLoginRequestAsync(email: string, pass: string) {
    let church = await this.commonService.GetChurchAsync();
    if (church == null) {
      this.refreshPageData();
      return;
    }
    let url = church.init.base_url;
    let result = null;
    result = await this.api.PostLoginRequestPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      url, email, pass
    );
    if (result == null) {
      return 'Login server error, plase login later.';
    }
    if (result._body == undefined) {
      return 'Login server error, plase login later.';
    }
    try {
      let data = JSON.parse(result._body)
      if (!data.auth.status) {
        return 'email and password does not match';
      }
      await this.fetchDataAndRefreshPageAsync();
      return "";
    }
    catch (e) {
      return result._body;
    }

  }

  Church(): Church {
    return this.commonService.ThisChurch;
  }

  async PostRegister(name: string, email: string, date: string, month: string, year: string) {
    let result = await this.api.PostRegisterPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url,
      name, email, date, month, year,
      this.commonService.ThisChurch.church.lat, this.commonService.ThisChurch.church.lng
    );
    console.log(result);
  }

  async refreshPageData() {
    // let homePageData = await this.getStoragePromise<any[]>('home');
    // if (homePageData != null) {
    //   if (this.homePageData.length > 0) {
    //     this.homePageData.splice(0, this.homePageData.length);
    //   }
    //   for (let item of homePageData) {
    //     this.homePageData.push(item);
    //   }
    // }
    // return this.homePageData;
    return await this.getStoragePromise<any[]>('home');
  }

  async RefreshFeaturedDate() {
    return await this.getStoragePromise<any[]>('featured');
  }

  async RefeshWhatIsOn() {
    return await this.getStoragePromise<any[]>('whatson');
  }

  async RefreshGivingId() {
    return await this.api.GetGivingIdPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url)
  }

  async PrepareSubmitDonation(model: GivingFIrstSubmit) {
    return await this.api.PrepareSubmitDonationPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url, model)
  }

  async PutSubDonationFirst(iknow: GiveIknow) {
    return await this.api.PutSubDonationFirstPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url, iknow)
  }

  async PostSubmitDonationSecond(data: GivingSecondSubmit) {
    return await this.api.PostSubmitDonationDetailPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      data
    );
  }

 async GetMediaSerial(streamId:number,serial:number){
    return await this.apiMedia.GetMediaPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url,streamId,serial
    )
  }
  async RefreshCampaigns() {
    return await this.getStoragePromise<any>('campaigns');
  }

  async RefreshSocialFeed(){
    return await this.getStoragePromise<any>('media');
  }

  async RefreshMediastreams() {
    return await this.getStoragePromise<any>('mediastreams');
  }

  private analysisHttpBack(input) {
    if(input==null){
      return null;
    }
    return input;
  }
  private saveValueInStore(data) {
    if (data == null) {
      this.refreshPageData();
      return;
    }
    let receiveDate = new Date();
    if (typeof (data.auth) != 'undefined') {
      this.events.publish('LoginMayChange', data.auth.status);
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), data.auth.key);
      this.storage.set(this.getStorageKey(AppKeyType.IsAuth.toString()), data.auth.status);
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
