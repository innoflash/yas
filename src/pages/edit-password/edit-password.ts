import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import * as $ from 'jquery';
import {User} from "../../utils/User";
import {Misc} from "../../utils/Misc";
import {Stats} from "../../utils/Stats";
import {YA_API} from "../../utils/YA_API";



@IonicPage()
@Component({
    selector: 'page-edit-password',
    templateUrl: 'edit-password.html',
})
export class EditPasswordPage {
    private user: User;
    private loading: Loading;
    public currentPassword: string;
    public newPassword: string;
    public confPassword: string;
    private isBlank: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private view: ViewController, private alertCtrl: AlertController,
                private loader: LoadingController, private toastCtrl: ToastController) {
        this.user = navParams.get('user');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditPasswordPage');
    }

    async changePassword(){
        this.isBlank = Misc.hasBlank([
            this.currentPassword,
            this.newPassword,
            this.confPassword
        ]);

        if (this.isBlank) {
            Misc.presentToast(this.toastCtrl, Stats.FILL_BLANKS);
        }else {
            if(this.newPassword.length < 6){
                Misc.presentAlert(this.alertCtrl, Stats.SHORT_PASSWORD);
            }else{
                if (this.newPassword == this.confPassword) {
                    this.loading = this.loader.create({
                        content: 'Changing your password ...'
                    });
                    this.loading.present();
                    $.ajax({
                        method: 'POST',
                        url: YA_API.EDIT_PASSWORD,
                        timeout: 5000,
                        data: {
                            id: this.user.id,
                            id_number: this.user.id_number,
                            current_password: this.currentPassword,
                            new_password: this.newPassword
                        }
                    }).done(response => {
                        console.log(response);
                        Misc.presentAlert(this.alertCtrl, response.message);
                        if (response.success) {
                            this.view.dismiss();
                        }
                    }).fail(error => {
                        console.log(error);
                        Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
                    }).always(() => {
                        this.loading.dismiss();
                    });
                }else{
                    Misc.presentToast(this.toastCtrl, Stats.UNMATCHING_PASSWORDS);
                }
            }

        }
    }

}
