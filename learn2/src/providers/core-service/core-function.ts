import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig, HttpType } from '../../modules/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export class CoreFunction {

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

}