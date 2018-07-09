import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    Modal,
    ModalController,
    ModalOptions,
    NavController
} from 'ionic-angular';
import * as $ from 'jquery';
import {Storage} from "@ionic/storage";
import {Stats} from "../../utils/Stats";
import {LoginPage} from "../login/login";
import {StoriesPage} from "../stories/stories";
import {ProfilePage} from "../profile/profile";
import {User} from "../../utils/User";
import {Misc} from "../../utils/Misc";
import {ConfAccPage} from "../conf-acc/conf-acc";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private loginModal: Modal;
    private user: User;
    private confModal: Modal;
    private modalOptions: ModalOptions;

    constructor(public navCtrl: NavController, private storage: Storage,
                private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController) {
        this.modalOptions = {
            enableBackdropDismiss: false
        };

    }

    ionViewDidEnter() {
        this.storage.get(Stats.AUTHENTICATED).then(authed => {
            console.log(authed);
            if (authed == null || !authed) {
                this.storage.get(Stats.CONFIRM_ACCOUNT).then(confirmAcc => {
                    console.log(confirmAcc);
                    if (confirmAcc == null || !confirmAcc) {
                        this.loginModal = this.modalCtrl.create(LoginPage, null, this.modalOptions);
                        this.loginModal.present();
                        this.loginModal.onDidDismiss(data => {
                            console.log(data);
                            this.ionViewDidEnter();
                        });
                    } else {
                        this.storage.get(Stats.USER_PROFILE).then(result => {
                            this.user = User.getUser(result);
                            this.confModal = this.modalCtrl.create(ConfAccPage, {
                                user: this.user
                            }, this.modalOptions);
                            this.confModal.present();
                            this.confModal.onDidDismiss(data => {

                            });
                        });
                    }
                });

            } else {
                this.storage.get(Stats.USER_PROFILE).then(result => {
                    this.user = User.getUser(result);
                    console.log(this.user);
                    $('#username').text(this.user.fullname);
                    $('.blur-landing').addClass('class' + Misc.getRandomInt(1, 3));
                }).catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
    }

    async openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'MY MENU',
            buttons: [
                {
                    text: 'Stories',
                    icon: 'paper',
                    handler: () => {
                        console.log('open stories page');
                        this.openStories();
                    }
                },
                {
                    text: 'Profile',
                    icon: 'person',
                    handler: () => {
                        console.log('profile clicked');
                        this.navCtrl.push(ProfilePage, {
                            user: this.user
                        });
                    }
                },
                {
                    text: 'Logout',
                    icon: 'log-out',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Are you sure?',
                            message: 'Do you want to log out of Youth Amp right now?',
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
                                    handler: () => {
                                        console.log('Buy clicked');
                                        this.storage.remove(Stats.AUTHENTICATED);
                                        this.ionViewDidEnter();
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

    async openStories() {
        this.navCtrl.push(StoriesPage, {
            user: this.user
        });
    }
}
