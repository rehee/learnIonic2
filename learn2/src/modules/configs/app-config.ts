export enum HttpType {
    Get = 1,
    Post = 2,
    Put = 3,
    Delete = 4
}
export enum IknowApiCall {
    ChurchInfo = 1,
    GetAllAppInfo = 2,
    LogOut = 3,
    Login = 4,
    Register = 5,
    GetGivingId = 6,
    GetMediaStreams = 7,
    GetMyHoliday = 8,
    MyAccount = 9,
    Rota = 10,
    NotificationToken = 11,
    UserNotificationToken = 12,
    ReadNotification = 13,
    RemoveNotification = 14,
    MediaStreamsNoChildren = 15,
    ImageToBase64 = 16,
    TeamLeaders = 17,
    TeamCampus = 18,
    TeamRotas = 19,
    TeamUpcomingEvents = 20,
    CalEventTeamEvent = 21,
    TeamEventRoles = 22

}
export class AppConfig {
    static Url: { [id: number]: string } = {
        [IknowApiCall.ChurchInfo]: "church/church.json",
        [IknowApiCall.GetAllAppInfo]: "/app/all",
        [IknowApiCall.LogOut]: "/app/all?logout=true",
        [IknowApiCall.Login]: "/auth/login",
        [IknowApiCall.Register]: "/auth/register",
        [IknowApiCall.GetGivingId]: "/finance/giving_ids",
        [IknowApiCall.GetMediaStreams]: "/mediastreams",
        [IknowApiCall.GetMyHoliday]: "/account/holidays",
        [IknowApiCall.MyAccount]: "/account",
        [IknowApiCall.Rota]: "/teams",
        [IknowApiCall.NotificationToken]: "/app/notificationtoken",
        [IknowApiCall.UserNotificationToken]: "/app/getAllNotifications",
        [IknowApiCall.ReadNotification]: "/app/readNotification",
        [IknowApiCall.RemoveNotification]: "/app/removeNotification",
        [IknowApiCall.MediaStreamsNoChildren]: "/mediastreams_no_children",
        [IknowApiCall.ImageToBase64]: "/image_to_64",
        [IknowApiCall.TeamLeaders]: "/teams/leaders",
        [IknowApiCall.TeamCampus]: "/teams/campus_detail",
        [IknowApiCall.TeamRotas]: "/teams/rotas_list",
        [IknowApiCall.TeamUpcomingEvents]: "/teams/upcoming_event",
        [IknowApiCall.CalEventTeamEvent]: "/teams/team_cal_event",
        [IknowApiCall.TeamEventRoles]:"/teams/role_list"
    }

    static GetApiUrl(apiCall: IknowApiCall, baseUrl: string = "", additionalUrl = "") {
        return `${baseUrl}${AppConfig.Url[apiCall]}${additionalUrl}`;
    }
    static GetApiBaseUrl(baseUrl: string) {
        return (apiCall: IknowApiCall, additionalUrl: string = "") => {
            return AppConfig.GetApiUrl(apiCall, baseUrl, additionalUrl)
        }
    }
    static GetBlankBaseUrl() {
        return "http://localhost:8888"
    }
    static RotaAdditionalUrl(team_id: number = 0, event_id: number = 0) {
        return `/${team_id}/rotas/${event_id}`;
    }


}