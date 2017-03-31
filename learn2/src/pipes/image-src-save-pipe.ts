import { Storage } from '@ionic/storage';
import { Pipe, PipeTransform } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CoreFunction } from '../providers/core-service/core-function';
import { HttpType } from '../modules/index';

@Pipe({
    name: 'imageTo64'
})
export class ImageSrcSavePipe implements PipeTransform {
    async transform(inputs: string) {
        if(inputs==null||inputs.trim()==""){
            return "";
        }
        let data = await this.getImageFromStorage(inputs);
        if(data!=null){
            return data;
        }
        let result: any = await ImageTo64Service.GetImageDataPromise(inputs);
        if (result == null) {
            return inputs;
        }
        this.storage.set(inputs,result);
        return result;
    }

    private getImageFromStorage(key:string){
        return new Promise((resolve,reject)=>{
            this.storage.get(key).then(
                success=>{resolve(success)},
                error=>{resolve(null)}
            )
        })
    }
    constructor(public storage: Storage) {

    }
}



export class ImageTo64Service {

    public static GetImageDataPromise(src: string) {
        return new Promise((resolve, reject) => {
            ImageTo64Service.toDataUrl(src, function(data: any) {
                if (data != null) {
                    resolve(data);
                } else {
                    resolve(null)
                }

            }, (e, event) => resolve(null))
        })
    }

    public static toDataUrl(url: string = "", callback: any, error: any) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(xhr.response);
            reader.onerror = error;
            reader.onloadend = ()=>{
                callback(reader.result);
            };
            reader.onabort = error;
        };
        xhr.onerror = error;
        xhr.abort = error;
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.send();
    }
}