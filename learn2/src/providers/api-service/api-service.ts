import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Church } from '../common-service/church'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
    GetChurchPromise(): Promise<Church> {
        return new Promise<Church>((resolve, reject) => {
            this.GetChurch().subscribe(
                response => resolve(response),
                error => { resolve(null); })
        });
    }
    GetChurch(): Observable<Church> {
        return this.http.get("church/church.json")
            .map((response: Response) => <Church>response.json())
            .catch(this.handleError)
    }


    GetContentPromise(apiKey:string,url:string,whoami:any){
        return new Promise((resolve,reject)=>{
            this.GetContent(apiKey,url,whoami).subscribe(
                response=>resolve(response),
                error =>resolve(null)
            )
        });
    }


    GetContent(apiKey: string, url: string, whoami: any): Observable<any> {
        let headers = new Headers({ "Content-Type": "application/json", "iknow-api-key": apiKey })
        let options = new RequestOptions({ headers: headers });
        return this.http.post(
            url + '/app/all',
            JSON.stringify(whoami),
            options)
            .map((response: Response) => response)
            .catch(this.handleError);
    }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    constructor(private http: Http) { }

}