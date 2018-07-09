import {Component} from '@angular/core';
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    Modal,
    ModalController,
    ModalOptions,
    NavController,
    NavParams,
    ViewController
} from 'ionic-angular';
import {Misc} from "../../utils/Misc";
import {Stats} from "../../utils/Stats";
import * as $ from 'jquery';
import {YA_API} from "../../utils/YA_API";
import {RegisterPage} from "../register/register";
import {Storage} from "@ionic/storage";
import {ConfAccPage} from "../conf-acc/conf-acc";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public logoPic: string;
    public id_number: number;
    public idString: string;
    public password: string;
    private loading: Loading;
    private registerModal: Modal;
    private confModal: Modal;
    private modalOptions: ModalOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private modalCtrl: ModalController, private storage: Storage,
                private view: ViewController) {
        this.logoPic = "assets/imgs/logo.png";
        this.modalOptions = {
            enableBackdropDismiss: false
        };
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    async login() {
        this.idString = String(this.id_number);
        console.log(Stats.FILL_BLANKS);
        if (this.idString == undefined || this.password == undefined) {
            Misc.presentAlert(this.alertCtrl, Stats.FILL_BLANKS);
        } else {
            if (this.idString.length == 0 || this.password.length == 0) {
                Misc.presentAlert(this.alertCtrl, Stats.FILL_BLANKS);
            } else {
                console.log('making API call');
                this.loading = this.loadingCtrl.create({
                    content: 'Signing in...'
                });

                this.loading.present();
                $.ajax({
                    method: 'POST',
                    url: YA_API.LOGIN,
                    timeout: 5000,
                    data: {
                        id_number: this.idString,
                        password: this.password
                    }
                }).done(data => {
                    console.log(data);
                    if (data.success) {
                        this.storage.set(Stats.AUTHENTICATED, true);
                        this.storage.set(Stats.USER_PROFILE, JSON.stringify(data.user));
                        this.view.dismiss(data.user);
                    } else {
                        Misc.presentAlert(this.alertCtrl, data.message);
                    }
                }).fail(error => {
                    console.log(error);
                    Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
                }).always(() => {
                    this.loading.dismiss();
                });
            }

        }
    }

    async forgotPassword() {
        console.log('will open forgot password');
    }

    async createAccount() {
        this.registerModal = this.modalCtrl.create(RegisterPage, null, this.modalOptions);
        this.registerModal.present();
        this.registerModal.onDidDismiss(data => {
            console.log(data);
            if (data != undefined) {
                if (data.openConfirmation) {
                    this.confModal = this.modalCtrl.create(ConfAccPage, {
                        user: data.user
                    }, this.modalOptions);
                    this.confModal.present();
                    this.confModal.onDidDismiss(data => {
                        console.log(data);
                    });
                }
                // this.view.dismiss(data.user);
            }
        });
    }


}
