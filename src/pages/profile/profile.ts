import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import * as jquery from 'jquery';
import {User} from "../../utils/User";
import {EditProfilePage} from "../edit-profile/edit-profile";
import {EditPasswordPage} from "../edit-password/edit-password";
import {Stats} from "../../utils/Stats";
import {Misc} from "../../utils/Misc";
import {YA_API} from "../../utils/YA_API";


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    private user: User;
    private loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController,
                private storage: Storage, private loader: LoadingController,
                private view: ViewController) {
        this.user = navParams.get('user');

    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad ProfilePage');
        this.storage.get(Stats.USER_PROFILE).then(data => {
            this.user = User.getUser(data);
        });
    }

    async editProfile() {
        this.navCtrl.push(EditProfilePage, {
            user: this.user
        });
    }

    async profileOptions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'PROFILE MENU',
            buttons: [
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.editProfile();
                    }
                },
                {
                    text: 'Change Password',
                    icon: 'unlock',
                    handler: () => {
                        console.log('change password');
                        this.navCtrl.push(EditPasswordPage, {
                            user: this.user
                        });
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Dangerous move !',
                            message: 'Do you really want to delete your account out of Youth Amp right now? If yes please enter your password below',
                            inputs: [
                                {
                                    name: 'password',
                                    placeholder: 'your password',
                                    type: 'password'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Nope',
                                    role: 'cancel',
                                    handler: () => {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Yeah!',
                                    handler: data => {
                                        console.log(data);
                                        this.doDelete(data);
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    async doDelete(data) {
        this.loading = this.loader.create({
            content: 'Deleting your account ...'
        });
        this.loading.present();
        jquery.ajax({
            method: 'POST',
            url: YA_API.DEL_PROFILE,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number,
                password: data.password
            }
        }).done(response => {
            Misc.presentAlert(this.alertCtrl, response.message);
            if (response.success) {
                this.storage.remove(Stats.USER_PROFILE);
                this.storage.remove(Stats.AUTHENTICATED);
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
