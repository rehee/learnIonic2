import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig, HttpType } from '../../modules/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController, Events, NavController } from 'ionic-angular';

export class CoreFunction {

    public static ConvertUrlToStorageBolb(convertPrime:any) {
        return (url: string) => {
            return convertPrime(url);
        }
    }

    static ConvertToOtherObject(objName: any, convertFunction: any = CoreFunction.DefaultConvertFunction): any {
        return <T>(input: any = null) => {
            return convertFunction(objName, input);
        }
    }

    static DefaultConvertFunction(objName: any, input: any) {
        let newObject: any = new objName();
        if (input == null) {
            return newObject;
        }
        for (let key in newObject) {
            try {
                if (newObject.hasOwnProperty(key)) {
                    newObject[key] = input[key]
                }
            } catch (e) {
            }
        }
        return newObject;
    }


    static GetHttpObservable(http: Http, httpType: HttpType, url: string = "", dataJson: string = "{}", option: RequestOptions =
        null, mapFunction: any = (response: Response) => <any>response.json(), error: any = (e) => Observable.throw(e.json().error || 'Server error')): Observable<any> {
        if (typeof (url) == 'undefined' || url == null) {
            url = "";
        }
        let observable: Observable<any>;
        switch (httpType) {
            case HttpType.Get:
                observable = http.get(
                    url, option
                )
                break;
            case HttpType.Post:
                observable = http.post(
                    url, dataJson, option
                )
                break;
            case HttpType.Put:
                observable = http.put(
                    url, dataJson, option
                )
                break;
        }
        return observable.map(mapFunction)
            .catch(error);
    }

    static GetIknowOption(apiKey: string = null): RequestOptions {
        let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
        let options = new RequestOptions({ headers: headers });
        return options;
    }


    static Delay(ms: number) {

        return new Promise(
            resolve => setTimeout(resolve, ms)
        )
    }



    static GetHttpResponse(getPromise: any, getObserver: any) {
        return <T>(httpType: HttpType, option: RequestOptions, url: string = "", data: any) => {
            return getPromise(getObserver(httpType, option, url, data));
        };
    }

    static GetHttpResponseAsync(getPromise: any, getObserver: any, generalUrl: any) {
        return <T>(httpType: HttpType, url: any = "", data: any = null, additionalUrl = "") => {
            return getPromise(getObserver(httpType, generalUrl(url, additionalUrl), data));
        };
    }

    static async GetHttpResponseAsyncResult(http: Http, option: any, baseUrl: any, getPromise: any, getObserverFunction: any, generalUrlFunction: any, error: any = (e) => Observable.throw(e.json().error || 'Server error')) {
        let thisOption = await option;
        let baseurl = await baseUrl;
        let getObserver = getObserverFunction(http, thisOption, error);
        let generalUrl = generalUrlFunction(baseurl);
        return <T>(httpType: HttpType, url: any = "", data: any = null, additionalUrl = "") => {
            return getPromise(getObserver(httpType, generalUrl(url, additionalUrl), data));
        };
    }

    static GetHttpPromise<T>(observe: Observable<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            observe.subscribe(
                response => {
                    resolve(response)
                },
                error => resolve(null)
            )
        });
    }

    static GetHttpObserve(http: Http, error: any = (e) => Observable.throw(e.json().error || 'Server error')) {
        return <T>(httpType: HttpType, option: RequestOptions, url: string = "", data: any) => {
            let observable: Observable<Response>;
            switch (httpType) {
                case HttpType.Get:
                    observable = http.get(
                        url, option
                    )
                    break;
                case HttpType.Post:
                    observable = http.post(
                        url, JSON.stringify(data), option
                    )
                    break;
                case HttpType.Put:
                    observable = http.put(
                        url, JSON.stringify(data), option
                    )
                    break;
            }
            return observable.map((reponse: Response) => <T>reponse.json())
                .catch(error);
        };
    }


    static GetHttpObserveAsync(http: Http, option: any, error: any = (e) => Observable.throw(e.json().error || 'Server error')) {


        return <T>(httpType: HttpType, url: string = "", data: any) => {
            let observable: Observable<Response>;
            switch (httpType) {
                case HttpType.Get:
                    observable = http.get(
                        url, option
                    )
                    break;
                case HttpType.Post:
                    observable = http.post(
                        url, JSON.stringify(data), option
                    )
                    break;
                case HttpType.Put:
                    observable = http.put(
                        url, JSON.stringify(data), option
                    )
                    break;
                case HttpType.Delete:
                    observable = http.delete(
                        url, option
                    )
                    break;
            }
            return observable.map((reponse: Response) => <T>reponse.json())
                .catch(error);
        };
    }

    static ExcutingFunctionByList(functions: any[] = [], leftToRight: boolean = true) {
        let functionExcute: any[];
        if (leftToRight) {
            functionExcute = functions.map(f => f);
        } else {
            functionExcute = functions.reverse().map(f => f);
        }
        return async (LastFunction: any = null) => {
            if (!leftToRight && LastFunction != null) {
                await LastFunction();
            }
            functionExcute.forEach(async f => {
                await f();
            });
            if (leftToRight && LastFunction != null) {
                await LastFunction();
            }
        }
    }

    static ComponseFunctins(funcs: any[]) {
        return async (input: any = null) => {
            let result: any = input;
            for (let i = funcs.length - 1; i >= 0; i--) {
                let cresult = await funcs[i](result);
                result = cresult;
            }
            return result;
        };
    }

    static IsSamePageCurrentTargetFunction(nav: NavController) {
    return (pageName: string) => {
        try {
            if (nav.getActive().component.name.toLowerCase() == pageName.toLowerCase()) {
                return true;
            }
            console.log(nav.getActive().component.name.toLowerCase())
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }

    }
}

}