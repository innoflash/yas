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
import {Storage} from "@ionic/storage";
import {YA_API} from "../../utils/YA_API";
import {PrivacyPolicyPage} from "../privacy-policy/privacy-policy";


@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    public first_name: string;
    public last_name: string;
    public email: string;
    public phone: number;
    public contact: string;
    public password: string;
    public conf_password: string;
    public agree: boolean = false;
    public id_number: number;
    public idString: string;
    private isBlank: boolean;
    private loading: Loading;
    private tcModal: Modal;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private storage: Storage, private view: ViewController,
                private modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    async register() {
        this.contact = String(this.phone);
        this.idString = String(this.id_number);

        this.isBlank = Misc.hasBlank([
            this.first_name,
            this.last_name,
            this.email,
            this.contact,
            this.idString,
            this.password
        ]);

        if (this.isBlank) {
            Misc.presentAlert(this.alertCtrl, Stats.FILL_BLANKS)
        } else {
            if (this.agree) {
                if (this.password == this.conf_password) {
                    if (this.password.length < 6) {
                        Misc.presentAlert(this.alertCtrl, Stats.SHORT_PASSWORD);
                    } else {
                        console.log('it must be here');
                        this.loading = this.loadingCtrl.create({
                            content: 'Creating account...'
                        });
                        this.loading.present();

                        $.ajax({
                            method: 'POST',
                            url: YA_API.REGISTER,
                            timeout: 5000,
                            data: {
                                first_name: this.first_name,
                                last_name: this.last_name,
                                email: this.email,
                                phone: this.contact,
                                password: this.password,
                                id_number: this.idString
                            }
                        }).done(data => {
                            console.log(data);
                            if (data.success) {
                                this.storage.set(Stats.AUTHENTICATED, true);
                                this.storage.set(Stats.USER_PROFILE, JSON.stringify(data.user));
                                this.view.dismiss(data);
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
                } else {
                    Misc.presentAlert(this.alertCtrl, Stats.UNMATCHING_PASSWORDS);
                }
            } else {
                Misc.presentAlert(this.alertCtrl, Stats.TERMS_AND_CONDITIONS);
            }
        }
    }

    async closeRegister() {
        //will close the modal
        this.view.dismiss();
    }

    async openTC() {
        const modalOptions: ModalOptions = {
            enableBackdropDismiss: false
        };
        this.tcModal = this.modalCtrl.create(PrivacyPolicyPage, null, modalOptions);
        this.tcModal.present();
    }
}
