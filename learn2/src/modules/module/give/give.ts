export class GiveModule {
    Ammount: number = 0;
    Campaign:string='0';
    IsGiftAid:boolean=false;
    FirstName:string="";
    LastName:string="";
    CardNumber:string="";
    StartMonth:string="";
    ExpireMonth:string="";
    IssueNumber:string="";
    CVVNumber:string="";
    BillingAddress1:string="";
    BillingAddress2:string="";
    BillingAddress3:string="";
    City:string="";
    County:string="";
    Postcode:string="";
    Email:string="";
    GiftFirstName:string="";
    GiftLastName:string="";
    GiftAddress:string="";
    GiftPostcode:string="";
    GiftEmail:string="";

    Avaliable():boolean{
        return false;
    }

}

export class GivingFIrstSubmit{
    giftaid:string="0";
    amount:string="1";
    campaign_id:string="0";
    giving_id:string=null;
}
export class GivingSecondSubmit{
    card_fname:string="";
    card_sname:string="";
    card_number:string="";
    card_start_m:string="";
    card_start_y:string="";
    card_expiry_m:string="";
    card_expiry_y:string="";
    card_issue:string="";
    card_cvv:string="";
    card_line1:string="";
    card_line2:string="";
    card_line3:string="";
    card_city:string="";
    card_county:string="";
    card_postcode:string="";
    invoice:string="";
    system_id:string="";
    avaliable_date:string="";
    amount:string="";
    desc:string="";
    url:string="";
    account_id:string="";

}

export class GiveIknow{
    email:string="";
    invoice:string="";
}