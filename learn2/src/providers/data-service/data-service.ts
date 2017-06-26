import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DeviceService, CommonService, AppKeyType, ApiService } from '../common-service';
import { ApiMedia } from '../media-service/api-media';
import { GiveModule, GivingFIrstSubmit, GivingSecondSubmit, GiveIknow, PushNotification } from '../../modules/index';
import { MusicStream, MusicSerie, MusicStreamImage, Episode } from '../../modules/index';
import { Church } from '../common-service/church';
import { CoreFunction } from '../core-service/core-function';
import { AppConfig, IknowApiCall, HttpType } from '../../modules/index';
import { MyNotificationType, MyNotificationItem, PushNotificationRecord } from '../../modules/module/index';
import { DataExtend } from './data-extent';
import { Badge } from '@ionic-native/badge';
import { DateExtent } from '../../pipes/index';
/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class DataService {

  constructor(public apiMedia: ApiMedia, public events: Events,
    public deviceService: DeviceService, public commonService: CommonService,
    public storage: Storage, public api: ApiService, private badge: Badge) {
    events.subscribe("LoginMayChange", async (status) => {
      if (deviceService.PushNotificationToken == null || deviceService.PushNotificationToken.trim() == "") {
        return;
      }
      // console.log(`${deviceService.PushNotificationToken} ${await this.getStoragePromise<number>(AppKeyType.PplId.toString())}`);
      await (await this.httpRequest())(HttpType.Post, IknowApiCall.NotificationToken, { ppl_id: await this.getStoragePromise<number>(AppKeyType.PplId.toString()), token: deviceService.PushNotificationToken }, "");
    })
  }
  CACHE_TIME: number = 1000 * 60 * 10;
  private async httpRequest() {
    let church: Church = await this.api.GetChurchPromise()
    return CoreFunction.GetHttpResponseAsync(
      CoreFunction.GetHttpPromise,
      CoreFunction.GetHttpObserveAsync(this.api.http, CoreFunction.GetIknowOption(await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()))),
      AppConfig.GetApiBaseUrl(church.init.base_url)
    )
  }

  private async httpRequestAsync() {
    let church: Church = await this.api.GetChurchPromise()
    return await CoreFunction.GetHttpResponseAsyncResult(
      this.api.http,
      CoreFunction.GetIknowOption(await this.getStoragePromise<string>(AppKeyType.ApiKey.toString())),
      church.init.base_url,
      CoreFunction.GetHttpPromise,
      CoreFunction.GetHttpObserveAsync,
      AppConfig.GetApiBaseUrl
    );
  }

  private async httpRequestBlank() {
    let church: Church = await this.api.GetChurchPromise()
    return CoreFunction.GetHttpResponseAsync(
      CoreFunction.GetHttpPromise,
      CoreFunction.GetHttpObserveAsync(
        this.api.http, CoreFunction.GetIknowOption(
          await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()))),
      AppConfig.GetApiBaseUrl(AppConfig.GetBlankBaseUrl())
    )
  }


  private async httpRequestAsyc() {
    let response = await this.httpRequest();

  }

  private async getContentPromise(isLogout: boolean = false) {
    let getContentApi = await this.httpRequest()
    return <any>getContentApi(
      HttpType.Post,
      isLogout ? IknowApiCall.LogOut : IknowApiCall.GetAllAppInfo,
      this.deviceService.getWhoami(), ""
    );
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
      this.storage.ready().then(() => {
        this.storage.get(this.getStorageKey(key)).then(
          data => resolve(data),
          error => resolve(null)
        );
      }).catch((e) => {
        resolve(null);
      });

    })
  }

  async getUserAuthAsync() {
    let auth: boolean = false;
    auth = await this.getStoragePromise<boolean>(AppKeyType.IsAuth.toString());
    if (auth == null) {
      auth = false;
    }
    else {
      this.events.publish('LoginMayChange', auth);
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
    let auth = await this.getUserAuthAsync();
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
    let content = await this.getContentPromise(isLogout);
    console.log(await this.getContentPromise(isLogout));
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
    let result = null;
    var httpAjax = await this.httpRequest();
    var userLogin = {
      email: email,
      password: pass
    }
    result = await httpAjax(HttpType.Post, IknowApiCall.Login, userLogin);
    console.log(result);
    if (result == null) {
      return 'Login server error, plase login later.';
    }
    try {
      let data = result;
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
    var data = await this.getStoragePromise<any[]>('home');
    return data;
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

  async GetMediaSerial(streamId: number, serial: number) {
    return await this.apiMedia.GetMediaPromise(
      await this.getStoragePromise<string>(AppKeyType.ApiKey.toString()),
      this.commonService.ThisChurch.init.base_url, streamId, serial
    )
  }
  async RefreshCampaigns() {
    return await this.getStoragePromise<any>('campaigns');
  }

  async GetGivingUrl() {
    return await this.getStoragePromise<string>('giving_url');
  }

  async RefreshSocialFeed() {
    return await this.getStoragePromise<any>('media');
  }

  async RefreshMediastreams() {
    return await this.getStoragePromise<any>('mediastreams');
  }
  async RefresAppInformation() {
    return await this.getStoragePromise<any>('info');
  }
  async RefreshMyNotification() {
    var data = await this.getStoragePromise<any>("notifications");
    if (data == null) {
      return [];
    }
    return data.map(b => DataExtend.ConvertObjectToMyNotificationItem(b)).filter(c => c != null);

  }
  async RefreshMyHoliday() {
    let httpRequest = await this.httpRequest();
    return await httpRequest(HttpType.Get, IknowApiCall.GetMyHoliday);
  }
  async AddRefreshMyHoliday(model: any) {
    let httpRequest = await this.httpRequest();
    return await httpRequest(HttpType.Post, IknowApiCall.GetMyHoliday, model);
  }
  async DeleteRefreshMyHoliday(id: any) {
    let httpRequest = await this.httpRequest();
    return await httpRequest(HttpType.Delete, IknowApiCall.GetMyHoliday, null, `/${id}`);
  }

  async RefreshMyChurch() {
    return await this.getStoragePromise<any>('my');
  }

  async RefreshMyTeam() {
    var my = await this.getStoragePromise<any>('my');
    if (my == null || my.teams == null) {
      return null;
    }
    var myteam: any[] = [];
    for (let key in my.teams) {
      if (my.teams.hasOwnProperty(key)) {
        myteam.push(my.teams[key]);
      }
    }
    return myteam;
  }


  async fetchTeamLeaderAndSave(instantId: number, key: string, time: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.TeamLeaders, null, `/${instantId}`);
    if (result == null) {
      return null;
    }
    this.storage.set(key, { data: result.data, time: time });
    return result.data;
  }

  async FetchTeamLeaders(instantId: number) {
    let key: string = this.getStorageKey(`team_id_${instantId}`);
    let time: number = (new Date()).getTime();
    let result = await this.storage.get(key);
    // || result.time + this.CACHE_TIME < time
    if (result == null) {
      return this.fetchTeamLeaderAndSave(instantId, key, time);
    }
    this.fetchTeamLeaderAndSave(instantId, key, time);
    return result.data;
  }


  async fetchTeamCampusAndSave(camps: string, key: any, time) {
    let campus = await (await this.httpRequest())(HttpType.Get, IknowApiCall.TeamCampus, null, `/${camps}`);
    if (campus == null || campus.data == null) {
      return null;
    }
    this.storage.set(key, { campus: campus.data, time: time });
    return campus.data;
  }

  async FetchTeamCampus(camps: string) {
    let time = (new Date()).getTime();
    let key = this.getStorageKey(`campu_${camps}`);
    let result = await this.storage.get(key);
    // || result.time + this.CACHE_TIME < time
    if (result == null) {
      return await this.fetchTeamCampusAndSave(camps, key, time);
    }
    this.fetchTeamCampusAndSave(camps, key, time);
    return result.campus;
  }


  async fetchTeamRotasAndSave(id: number, key: string, time: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.TeamRotas, null, `/${id}`);
    if (result == null || result.data == null) {
      return [];
    }
    this.storage.set(key, { data: result.data, time: time });
    return result.data;
  }


  async FetchTeamRotas(id: number) {
    let key: string = this.getStorageKey(`team_team_rotas_${id}`);
    let time: number = (new Date()).getTime();
    let result = await this.storage.get(key);
    // || result.time + this.CACHE_TIME < time
    if (result == null) {
      return await this.fetchTeamRotasAndSave(id, key, time);
    }
    this.fetchTeamRotasAndSave(id, key, time);
    return result.data;
  }

  async fetchUpcomingTeamEventAndSave(id: number, key: string, time: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.TeamUpcomingEvents, null, `/${id}`);
    if (result == null || result.data == null) {
      return [];
    }
    console.log(result.data);
    this.storage.set(key, { data: result.data, time: time });
    return result.data;
  }

  async FetchTeamUpcomingEvents(id: number) {
    let key: string = this.getStorageKey(`team_upcoming_event_${id}`);
    let time: number = (new Date()).getTime();
    let result = await this.storage.get(key);
    // || result.time + this.CACHE_TIME < time
    if (result == null) {
      return await this.fetchUpcomingTeamEventAndSave(id, key, time);
    }
    this.fetchUpcomingTeamEventAndSave(id, key, time);
    return result.data;
  }


  async fetchCalEventByTeamAndEvent(teamId: number, eventId: number, calId: number = 0, isPrev: boolean = false) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.CalEventTeamEvent, null, `/${teamId}/${eventId}/${calId}/${isPrev}`);
    if (result == null || result.data == null) {
      return [];
    }
    return result.data;
  }

  async fetchTeamEventRoleList(teamId: number, calId: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.TeamEventRoles, null, `/${teamId}/${calId}`);
    if (result == null || result.data == null) {
      return [];
    }
    return result.data;
  }

  async RefreshMyDetail() {
    return await (await this.httpRequest())(HttpType.Get, IknowApiCall.MyAccount, null, "");
  }
  async PostMyDetail(model: any) {
    return await (await this.httpRequest())(HttpType.Put, IknowApiCall.MyAccount, { data: model }, "");
  }
  async GetRote(addidionUrl: string) {
    return await (await this.httpRequest())(HttpType.Get, IknowApiCall.Rota, null, addidionUrl);
  }
  private analysisHttpBack(input) {
    if (input == null) {
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
      this.events.publish('LoginChange', data.auth.status);
      this.storage.set(this.getStorageKey(AppKeyType.ApiKey.toString()), data.auth.key);
      this.storage.set(this.getStorageKey(AppKeyType.IsAuth.toString()), data.auth.status);
      this.storage.set(this.getStorageKey(AppKeyType.PplId.toString()), data.auth.ppl_id);
      if (data.auth == false) {
        this.storage.set(this.getStorageKey(AppKeyType.PushNotificatins.toString()), null);
      }
    }
    this.storage.set(this.getStorageKey(AppKeyType.LastUpdateTime.toString()), receiveDate.getTime());
    for (let key in data.data) {
      if (data.data.hasOwnProperty(key)) {
        this.storage.set(this.getStorageKey(key), data.data[key]);
      }
    }
    this.refreshPageData();
  }


  async AddPushNotification(title: string, message: string) {
    let lists: PushNotification[] = await this.getStoragePromise<any>(AppKeyType.PushNotificatins.toString());
    if (lists == null) {
      lists = [];
    }
    let input: PushNotification = new PushNotification();
    input.NotificationTitle = title;
    input.NotificationMessage = message;
    lists.push(input);
    this.storage.set(this.getStorageKey(AppKeyType.PushNotificatins.toString()), lists);
  }

  async GetAllPushNotifications() {
    return await this.getStoragePromise<any>(AppKeyType.PushNotificatins.toString());
  }
  async ClearPushNotification() {
    await this.storage.remove(this.getStorageKey(AppKeyType.PushNotificatins.toString()));
  }

  ReNewBadge(index: number = 0) {
    this.GetAllPushNotifications().then((list) => {
      let badge: number = 0;
      if (list == null) {

      } else {
        badge = list.length;
      }
      this.badge.set(badge + index);
    })
  }

  async FetchUserNotification(): Promise<PushNotificationRecord[]> {
    let list = await (await this.httpRequest())(HttpType.Get, IknowApiCall.UserNotificationToken, null, "");
    console.log(list);
    console.log(list == []);
    if (list == null) {
      return [];
    }
    else {
      console.log(1);
      this.storage.set(this.getStorageKey(AppKeyType.PushNotificatins.toString()), list);
      return list;
    }
  }

  async RefreshNotification(): Promise<PushNotificationRecord[]> {
    let result: any = await this.getStoragePromise(AppKeyType.PushNotificatins.toString());
    if (result == null || result.length == null || result.length == 0) {
      return [];
    }
    return result.map(b => {
      let item = new PushNotificationRecord();
      item.notificationId = b.notificationId;
      item.title = b.title;
      item.text = b.text;
      item.content = b.content
      item.sendTime = DateExtent.ConvertStringToDate(b.sendTime);
      if (b.readTime != null) {
        item.readTime = DateExtent.ConvertStringToDate(b.readTime);
      } else {
        item.readTime = null;
      };
      return item;
    });
  }

  async ReadNotification(id: number = -1) {
    return await (await this.httpRequest())(HttpType.Post, IknowApiCall.ReadNotification, { id: id }, "");
  }
  async RemoveNotification(id: number = -1) {
    return await (await this.httpRequest())(HttpType.Post, IknowApiCall.RemoveNotification, { id: id }, "");
  }


  async FetchAllPodcastInBack() {
    let data: any = await this.getStoragePromise("allStream");
    let streams: MusicStream[] = [];
    let nowTime = new Date().getTime();
    if (data == null || data.data == null || data.time == null || nowTime - data.time > 600000) {
      streams = await this.FetchMediaStream();
      if (streams == null) {
        return;
      }
      streams.forEach(
        async (b) => {
          // let stream = await this.FetchStreamByIdInBack(b.stream_id);
          await this.FetchGetMediaStreamById(b.stream_id);
        }
      );
    }
    else {
      streams = data.data;
    }


  }

  async FetchStreamByIdInBack(id: number): Promise<MusicStream> {
    return await this.GetMediaStreamById(id);
  }

  async FetchMediaStream(): Promise<MusicStream[]> {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.MediaStreamsNoChildren, null, "");
    if (result == null || result.status != true) {
      return [];
    }
    let newResult = result.data.stream.map(b => {
      let stream: MusicStream = new MusicStream();
      for (let key in b) {
        stream[key] = b[key];
      }
      return stream;
    }).sort((a: MusicStream, b: MusicStream) => {
      let firstDate = new Date(a.stream_created_date).getTime();
      let lastDate = new Date(b.stream_created_date).getTime();
      if (isNaN(firstDate)) {
        firstDate = 0;
      }
      if (isNaN(lastDate)) {
        lastDate = 0;
      }
      return -(firstDate - lastDate);
    });
    let timeNow = new Date();
    await this.storage.set(this.getStorageKey("allStream"), { data: newResult, time: timeNow.getTime() });
    return newResult;

  }


  async GetMediaStream(): Promise<MusicStream[]> {
    let data: any = await this.getStoragePromise("allStream");
    if (data == null || data.data == null || data.time == null) {
      return await this.FetchMediaStream();
    }
    return data.data;
  }



  async FetchGetMediaStreamById(id: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.MediaStreamsNoChildren, null, `/${id}`);
    console.log(result);
    if (result == null || result.status != true) {
      return null;
    }
    try {
      let stream: MusicStream = new MusicStream();
      for (let key in result.data.stream) {
        if (key != "series") {
          stream[key] = result.data.stream[key];
        } else {
          let series = [];
          for (let seriesKey in result.data.stream.series) {
            series.push(result.data.stream.series[seriesKey]);
          }
          stream.series = series.map(b => {
            let musicSerie: MusicSerie = new MusicSerie();
            for (let mKey in b) {
              if (mKey == "image") {
                musicSerie.image = new MusicStreamImage();
                musicSerie.image.b64 = b.image.b64;
                musicSerie.image.sha1 = b.image.sha1;
              } else {
                musicSerie[mKey] = b[mKey];
              }
            }
            return musicSerie;
          }).sort((a, b) => {
            let firstDate = new Date(a.latest_episode_date).getTime();
            let lastDate = new Date(b.latest_episode_date).getTime();
            if (isNaN(firstDate)) {
              firstDate = 0;
            }
            if (isNaN(lastDate)) {
              lastDate = 0;
            }
            return -(firstDate - lastDate);
          })
        }
      }
      let timeNow = new Date();
      await this.storage.set(this.getStorageKey("stream" + id), { data: stream, time: timeNow.getTime() });
      return stream;
    } catch (e) {
      return null;
    }

  }

  async GetMediaStreamById(id: number) {

    let data: any = await this.getStoragePromise("stream" + id);
    console.log(data);
    let timeNow = new Date();
    if (data == null || data.time == null) {
      return await this.FetchGetMediaStreamById(id);
    }
    return data.data;
  }
  async GetMediaStreamByIdEpsoId(id: number, epsoId: number) {
    let result = await (await this.httpRequest())(HttpType.Get, IknowApiCall.MediaStreamsNoChildren, null, `/${id}/${epsoId}`);
    if (result == null || result.status != true) {
      return null;
    }
    let musicSerie: MusicSerie = new MusicSerie();
    for (let mKey in result.data.series) {
      if (mKey == "image") {
        musicSerie.image = new MusicStreamImage();
        musicSerie.image.b64 = result.data.series.image.b64;
        musicSerie.image.sha1 = result.data.series.image.sha1;
      }
      else if (mKey == "episodes") {
        musicSerie.episodes = result.data.series.episodes.map(b => {
          let episode: Episode = new Episode();
          for (let eKey in b) {
            episode[eKey] = b[eKey];
          }
          return episode;
        });
      }
      else {
        musicSerie[mKey] = result.data.series[mKey];
      }
    }
    console.log(musicSerie);
    return musicSerie;
  }
  public MusicTrack: any[] = [];
  public DisplayMusicController: boolean = true;



  async GetImageByServer(src: string) {
    return await (await this.httpRequestBlank())(HttpType.Post, "", { path: src });
  }
}
