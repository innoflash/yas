import {Component} from '@angular/core';
import * as jquery from 'jquery';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
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
                private loader: LoadingController, private alertCtrl: AlertController) {
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
        if (this.isBlank) {
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
            }).fail(error => {
                console.log(error);
                Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
            }).always(() => {
                this.loading.dismiss();
            });
        }
    }

    async cancelAccount() {

    }

    async requestCode() {

    }
}
