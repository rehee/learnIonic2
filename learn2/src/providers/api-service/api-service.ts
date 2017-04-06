import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig, IknowApiCall, HttpType } from '../../modules/index';
import { CoreFunction } from '../core-service/core-function';
import { Church } from '../common-service/church'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { GiveModule, GivingFIrstSubmit, GivingSecondSubmit, GiveIknow } from '../../modules/index';

@Injectable()
export class ApiService {
    constructor(public http: Http) { }
    httpRequest:any = CoreFunction.GetHttpResponse(
        CoreFunction.GetHttpPromise,
        CoreFunction.GetHttpObserve(this.http)
    );

    GetChurchPromise(): Promise<Church> {
        return new Promise<Church>((resolve, reject) => {
            CoreFunction.GetHttpObservable(
                this.http, HttpType.Get, AppConfig.GetApiUrl(IknowApiCall.ChurchInfo)
            ).subscribe(
                response => resolve(response),
                error => resolve(null)
                )
        });
    }


    GetGivingIdPromise(apiKey: string, url: string) {
        return new Promise((resolve, reject) => {
            CoreFunction.GetHttpObservable(
                this.http, HttpType.Get, AppConfig.GetApiUrl(IknowApiCall.GetGivingId, url), null, CoreFunction.GetIknowOption(apiKey)
            ).subscribe(
                response => resolve(response),
                error => reject
                )
        })
    }
    async GetContentPromise(apiKey: string, url: string, whoami: any, isLogout: boolean = false):Promise<any> {
        let urlWillUse = isLogout ? AppConfig.GetApiUrl(IknowApiCall.LogOut, url) : AppConfig.GetApiUrl(IknowApiCall.GetAllAppInfo, url);
            let apikeyWillUse = isLogout ? null : apiKey;
        return <any>this.httpRequest(
            HttpType.Post,CoreFunction.GetIknowOption(apikeyWillUse),urlWillUse,whoami
        );
    }

    PostLoginRequestPromise(apiKey: string, url: string, userEmail: string, userPass: string) {
        return new Promise((resolve, reject) => {
            CoreFunction.GetHttpObservable(
                this.http, HttpType.Post, AppConfig.GetApiUrl(IknowApiCall.Login, url),
                JSON.stringify({
                    email: userEmail,
                    password: userPass
                }),
                CoreFunction.GetIknowOption(apiKey)).subscribe(
                response => resolve(response),
                error => resolve(null)
                )
        });
    }

    
    PostRegisterPromise(apiKey: string, url: string, name: string, email: string, date: string, month: string, year: string, lat: string, long: string) {
        let post: any = {
            "name": name,
            "email": email,
            "dob-d": date,
            "dob-m": month,
            "dob-y": year,
            "lat": lat,
            "long": long
        };
        return <any>this.httpRequest(
            HttpType.Post,CoreFunction.GetIknowOption(apiKey),AppConfig.GetApiUrl(IknowApiCall.Register, url),post
        );
    }

    PrepareSubmitDonationPromise(apiKey: string, url: string, firstModule: GivingFIrstSubmit): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.PrepareSubmitDonation(apiKey, url, firstModule).subscribe(
                response => resolve(response),
                error => resolve(null)
            )
        })
    }
    PrepareSubmitDonation(apiKey: string, url: string, firstModule: GivingFIrstSubmit) {
        let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            url + '/finance/donations',
            JSON.stringify(firstModule),
            options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }


    PostSubmitDonationDetailPromise(apiKey: String, detail: GivingSecondSubmit) {
        return new Promise((resolve, reject) => {
            this.PostSubmitDonationDetail(apiKey, detail).subscribe(
                response => resolve(response),
                error => resolve(null)
            )
        });
    }
    PostSubmitDonationDetail(apiKey: String, detail: GivingSecondSubmit) {
        let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            'https://api.divinepassport.com/1/pay',
            JSON.stringify(detail),
            options
        )
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }


    PutSubDonationFirstPromise(apiKey: string, url: string, iknow: GiveIknow) {
        return new Promise((resolve, reject) => {
            this.PutSubDonationFirst(apiKey, url, iknow).subscribe(
                response => resolve(response),
                error => resolve(null)
            )
        })
    }
    
    PutSubDonationFirst(apiKey: string, url: string, iknow: GiveIknow) {
        let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
        let options = new RequestOptions({ headers: headers });
        return this.http.put(
            url + '/finance/details',
            JSON.stringify(iknow),
            options
        )
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    

}