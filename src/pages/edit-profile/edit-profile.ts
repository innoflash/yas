import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ToastController,
    ViewController
} from 'ionic-angular';
import * as $ from 'jquery';
import {User} from "../../utils/User";
import {Misc} from "../../utils/Misc";
import {Stats} from "../../utils/Stats";
import {YA_API} from "../../utils/YA_API";


@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    private user: User;
    private loading: Loading;
    private isBlank: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loader: LoadingController, private alertCtrl: AlertController,
                private storage: Storage, private toastCtrl: ToastController,
                private view: ViewController) {
        this.user = this.navParams.get('user');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
    }

    async edit() {
        this.isBlank = Misc.hasBlank([
            this.user.first_name,
            this.user.last_name,
            this.user.email,
            String(this.user.phoneNumber),
            String(this.user.id_number)
        ]);

        if (this.isBlank) {
            Misc.presentToast(this.toastCtrl, Stats.FILL_BLANKS);
        } else {
            console.log(this.user);
            this.loading = this.loader.create({
                content: 'Editing your profile ..'
            });
            this.loading.present();
            $.ajax({
                method: 'POST',
                url: YA_API.EDIT_PROFILE,
                timeout: 5000,
                data: {
                    id: this.user.id,
                    id_number: this.user.id_number,
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    email: this.user.email,
                    phone: this.user.phoneNumber
                }
            }).done(response => {
                console.log(response);
                Misc.presentAlert(this.alertCtrl, response.message);
                if (response.success) {
                    this.storage.set(Stats.USER_PROFILE, JSON.stringify(response.user));
                    this.view.dismiss();
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
