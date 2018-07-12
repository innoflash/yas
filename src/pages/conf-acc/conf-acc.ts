import {Component} from '@angular/core';
import * as jquery from 'jquery';
import {Storage} from "@ionic/storage";
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import {Misc} from "../../utils/Misc";
import {Stats} from "../../utils/Stats";
import {YA_API} from "../../utils/YA_API";

/**
 * Generated class for the ConfAccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-conf-acc',
    templateUrl: 'conf-acc.html',
})
export class ConfAccPage {

    public user: any;
    public confCode: number;
    private loading: Loading;
    private isBlank: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loader: LoadingController, private alertCtrl: AlertController,
                private storage: Storage, private view: ViewController,
                private toastCtrl: ToastController) {
        this.user = navParams.get('user');
        console.log(this.user);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConfAccPage');
    }

    async confirmAcc() {
        this.isBlank = Misc.hasBlank([
            String(this.confCode)
        ]);
        if (this.confCode == undefined || String(this.confCode).length == 0) {
            Misc.presentAlert(this.alertCtrl, 'Please enter the confirm code you receive via SMS/email')
        } else {
            this.loading = this.loader.create({
                content: 'Confirming your account ..'
            })
            this.loading.present();
            jquery.ajax({
                method: 'POST',
                url: YA_API.CONFIRM_ACCOUNT,
                timeout: 5000,
                data: {
                    id: this.user.id,
                    code: String(this.confCode)
                }
            }).done(response => {
                console.log(response);
                Misc.presentToast(this.toastCtrl, response.message);
                if (response.success) {
                    this.storage.set(Stats.AUTHENTICATED, true);
                    this.storage.set(Stats.CONFIRM_ACCOUNT, false);
                    this.storage.remove(Stats.CONFIRM_ACCOUNT);
                    this.view.dismiss({
                        restartApp: true
                    });
                }
            }).fail(error => {
                console.log(error);
                Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
            }).always(() => {
                this.loading.dismiss();
            });
        }
    }

    async cancelAccount() {
        const confirm = this.alertCtrl.create({
            title: 'Are you sure?',
            message: 'Do you want to delete your unconfirmed account from Youth Amp',
            buttons: [
                {
                    text: 'Nope'
                },
                {
                    text: 'Yes !',
                    handler: () => {
                        console.log('will delete account');
                        this.deleteAccount();
                    }
                }
            ]
        });
        confirm.present();
    }

    async requestCode() {
        const confirm = this.alertCtrl.create({
            title: 'Are you sure?',
            message: 'This means you haven`t received a confirmation code in your SMS/email and you wnat it now?',
            buttons: [
                {
                    text: 'Nope'
                },
                {
                    text: 'Yes !',
                    handler: () => {
                        console.log('will delete account');
                        this.askForCode();
                    }
                }
            ]
        });
        confirm.present();
    }

    async askForCode() {
        this.loading = this.loader.create({
            content: 'Requesting code ...'
        });
        this.loading.present();
        jquery.ajax({
            method: 'POST',
            url: YA_API.REQUEST_CODE,
            timeout: 5000,
            data: {
                id: this.user.id
            }
        }).done(response => {
            console.log(response);
            Misc.presentAlert(this.alertCtrl, response.message);
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
        }).always(() => {
            this.loading.dismiss();
        });
    }

    async deleteAccount() {
        this.loading = this.loader.create({
            content: 'Deleting your account ..'
        })
        this.loading.present();
        jquery.ajax({
            method: 'POST',
            url: YA_API.DEL_ACCOUNT,
            timeout: 5000,
            data: {
                id: this.user.id
            }
        }).done(response => {
            console.log(response);
            Misc.presentAlert(this.alertCtrl, response.message);
            if (response.success) {
                this.storage.set(Stats.CONFIRM_ACCOUNT, false);
                this.storage.remove(Stats.CONFIRM_ACCOUNT);
                this.storage.remove(Stats.USER_PROFILE);
                this.view.dismiss({
                    restartApp: true
                });
            }
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
        }).always(() => {
            this.loading.dismiss();
        });
    }
}
