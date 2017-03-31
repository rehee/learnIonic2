import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService ,AppKeyType} from '../../providers/common-service';
import { GiveModule, GivingFIrstSubmit, GiveIknow, GivingSecondSubmit } from '../../modules/index';
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery';
@Component({
    selector: 'give',
    templateUrl: 'give.html'
})
export class GivePage implements OnInit, OnChanges {
    constructor(private dataService: DataService, private alert: AlertController) {

    }
    ngOnChanges() {
        this.ThisGiving.Postcode

    }
    async ngOnInit() {
        await this.refreshGivingIdAndCompanin();
    }

    async refreshGivingIdAndCompanin() {
        let givingResponse: any = await this.dataService.RefreshGivingId();
        if (givingResponse != null && givingResponse.data != null) {
            this.GivingId = [];
            for (let item of givingResponse.data) {
                this.GivingId.push(item);
            }
        }
        let campaigns: any = await this.dataService.RefreshCampaigns();
        if (campaigns != null) {
            this.Campaigns = [];
            for (let item of campaigns) {
                this.Campaigns.push(item);
            }
        }
        console.log(this.GivingId);
    }
    ThisStage: GiveStage = GiveStage.Start;

    StageString(): string {
        return GiveStage[this.ThisStage];
    }
    ThisGiving: GiveModule = new GiveModule();
    Ammount: number = 0;
    AmmountDisplay: string = '0';
    GivingId: any[] = [];
    Campaigns: any[] = [];
    SelectCampaigns: string = "";


    CheckAmmount() {
        if (isNaN(this.Ammount)) {
            this.Ammount = 0;
        }
        this.AmmountDisplay = Number(this.Ammount).toFixed(2);
        this.ThisGiving.IsGiftAid
    }

    ChangeState(state: string): void {

        if (this.ThisStage == GiveStage.MakeDonation && state == GiveStage[GiveStage.InputDetail]) {
            if (isNaN(this.ThisGiving.Ammount) || this.ThisGiving.Ammount < 0.99) {
                let a = this.alert.create({
                    title: 'amount not correct',
                    subTitle: 'Amount must over 1 pound',
                    buttons: ['Ok']
                });
                a.present();
                return;
            }
        }

        switch (GiveStage[state]) {
            case GiveStage.InputDetail:
                this.prepareDonation();
                break;
        }

        this.ThisStage = GiveStage[state];
    }

    async PostGiving() {
        await this.submitForm()
    }

    async prepareDonation() {
        if (this.ThisGiving.IsGiftAid) {
            this.FirstSubmit.giftaid = "1";
        } else {
            this.FirstSubmit.giftaid = "0";
        }
        this.FirstSubmit.amount = String(this.ThisGiving.Ammount);
        this.FirstSubmit.campaign_id = this.ThisGiving.Campaign;
        this.FirstSubmit.giving_id = null;
        this.donationInfo = await this.dataService.PrepareSubmitDonation(this.FirstSubmit);
        console.log(this.donationInfo);
        await this.refreshGivingIdAndCompanin();
        if (this.donationInfo == null) {
            let a = this.alert.create({
                title: 'Server Error',
                subTitle: 'Server Error, Can not process your request now. pleast try later',
                buttons: ['Ok']
            });
            a.present();
            return;
        }
    }
    donationInfo: any = null;
    FirstSubmit: GivingFIrstSubmit = new GivingFIrstSubmit();
    iknow: GiveIknow = null;
    bill: GivingSecondSubmit = null;

    async submitForm() {
        if (this.donationInfo == null) {
            return;
        }
        this.iknow = new GiveIknow();
        this.iknow.email = this.ThisGiving.Email;
        this.iknow.invoice = this.donationInfo.invoice;

        let checkAvaliable: any = await this.dataService.PutSubDonationFirst(this.iknow);
        if (checkAvaliable == null || checkAvaliable.status == false) {
            return;
        }
        

        this.bill = new GivingSecondSubmit();
        this.bill.system_id = this.donationInfo.system_id;
        this.bill.account_id = this.donationInfo.passport_id;
        this.bill.card_fname = this.ThisGiving.FirstName;
        this.bill.card_sname == this.ThisGiving.LastName;
        this.bill.card_number = this.ThisGiving.CardNumber;
        this.bill.card_start_m = "01";
        this.bill.card_start_y = "01";
        this.bill.card_expiry_m = "01";
        this.bill.card_expiry_y = "01";
        this.bill.card_issue = this.ThisGiving.IssueNumber;
        this.bill.card_cvv = this.ThisGiving.CVVNumber;
        this.bill.card_line1 = this.ThisGiving.BillingAddress1;
        this.bill.card_line2 = this.ThisGiving.BillingAddress2;
        this.bill.card_line3 = this.ThisGiving.BillingAddress3;
        this.bill.card_city = this.ThisGiving.City;
        this.bill.card_county = this.ThisGiving.County;
        this.bill.card_postcode = this.ThisGiving.Postcode;
        this.bill.amount = Number(this.ThisGiving.Ammount).toFixed(2);
        this.bill.desc = "iKnow App Giving";
        this.bill.url = this.dataService.Church().init.base_url + '/finance/donations/ipn';
        alert(JSON.stringify(this.bill));
        let apikey = await this.dataService.getStoragePromise<string>(AppKeyType.ApiKey.toString())
        // let result = await this.dataService.PostSubmitDonationSecond(this.bill)
        $.ajax({
            url: 'https://api.divinepassport.com/1/pay',
            dataType: 'json',
            type: 'POST',
            data: this.bill,
            headers: { 'iknow-api-key':  apikey},
            success: (response) => alert(JSON.stringify(response)),
            error: (error) => console.log(JSON.stringify(error))
            }
        )
        
    }
}
export enum GiveStage {
    Start = 1,
    MakeDonation = 2,
    InputDetail = 3,
    Varify = 4
}