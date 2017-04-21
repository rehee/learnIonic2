export class RotaModule{
    date:string;
    roles:RoteItem=new RoteItem();
}
export class RoteItem{
    Lights:RoteUnit[]=[];
    Overhead:RoteUnit[]=[];
    Sound:RoteUnit[]=[];
}
export class RoteUnit{
    cal_date:string;
    cal_id:number;
    person_id:number;
    ppl_fname:string;
    ppl_sname:string;
    role:string;
}
