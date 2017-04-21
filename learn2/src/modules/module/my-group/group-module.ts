export class GroupModule {
    id:number;
    name:string;
}

export class TeamModule{
    id:number;
    campus_abbr:string;
    name:string;
    rota_events:RotaEvents[]=[];
}
export class RotaEvents{
    event_id:number;
    campus_abbr:string;
    event_name:string;
    team_id:number;
    team_name:string;
}