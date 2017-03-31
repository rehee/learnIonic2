export enum HttpType{
    Get=1,
    Post=2,
    Put=3
}
export enum IknowApiCall{
    ChurchInfo=1,
    GetAllAppInfo=2,
    LogOut=3,
    Login=4,
    Register=5,
    GetGivingId = 6,
    GetMediaStreams=7
}
export class AppConfig {
    static Url:{[id:number]:string}={
        [1]:"church/church.json",
        [2]:"/app/all",
        [3]:"/app/all?logout=true",
        [4]:"/auth/login",
        [5]:"/auth/register",
        [6]:"/finance/giving_ids",
        [7]:"/mediastreams"
    }

    static GetApiUrl(apiCall:IknowApiCall,baseUrl:string="",additionalUrl=""){
        return `${baseUrl}${AppConfig.Url[apiCall]}${additionalUrl}`;
    }


}