import { Component, OnInit } from '@angular/core';
import { AlertController, Alert, LoadingController } from 'ionic-angular';
import { DataService } from '../../../../providers/common-service';

@Component({
    selector: 'home-login-promp',
    templateUrl: 'login-promp-weidges.html'
})
export class HomeLoginPrompComponent implements OnInit {
    constructor(private alertCtrl: AlertController, private loading: LoadingController, private dataService: DataService) { }

    ngOnInit() {

    }
    register() {
        let prompt = this.alertCtrl.create({
            title: 'Registe',
            message: "Filling the register form to register",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
                {
                    name: 'email',
                    placeholder: 'email'
                },
                {
                    name: 'birth',
                    placeholder: 'dd-mm-yyyy',
                    type: "date"
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        let birthday = data.birth;
                        let birthdayDay: string, birthdayMonth: string, birthdayYear: string
                        if (birthday == 0) {
                            birthdayDay = "00";
                            birthdayMonth = "00";
                            birthdayYear = "0000";
                        }
                        this.dataService.PostRegister(data.name, data.email, birthdayDay, birthdayMonth, birthdayYear);
                    }
                }
            ]
        });
        prompt.present();
    }

    private loginPrompt: Alert;
    private createLoginPrompt() {
        this.loginPrompt = this.alertCtrl.create({
            title: 'Login',
            message: "Entetr your user email and password to login",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email'
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                        this.postLoginRequest(data.email, data.password);
                    }
                }
            ]
        });
    }

    private async postLoginRequest(userEmail: string, userPassword: string) {
        let load = this.loading.create({ content: 'Login your account...' });
        load.present();
        let result = await this.dataService.PostLoginRequestAsync(userEmail, userPassword);
        if (result != "") {
            let alert = this.alertCtrl.create({
                title: 'Login Error',
                subTitle: result,
                buttons: ['Ok']
            });
            alert.present();
        }
        
        load.dismiss();
    }
    loginApp() {
        this.createLoginPrompt();
        this.loginPrompt.present();
    }



}