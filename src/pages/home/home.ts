import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    Modal,
    ModalController,
    ModalOptions,
    NavController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Stats} from "../../utils/Stats";
import {LoginPage} from "../login/login";
import {StoriesPage} from "../stories/stories";
import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    loginModal: Modal;

    constructor(public navCtrl: NavController, private storage: Storage,
                private modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        this.storage.get(Stats.AUTHENTICATED).then(authed => {
            console.log(authed);
            if (authed == null || !authed) {
                const modalOptions: ModalOptions = {
                    enableBackdropDismiss: false
                };
                this.loginModal = this.modalCtrl.create(LoginPage, null, modalOptions);
                this.loginModal.present();
                this.loginModal.onDidDismiss(data => {
                    console.log(data);
                    this.ionViewDidLoad();
                });
            } else {
                //todo initialise the user`s daily page
            }
        }).catch(error => console.log(error));
    }

    async openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'MY MENU',
            buttons: [
                {
                    text: 'Stories',
                    icon: '',
                    handler: () => {
                        console.log('open stories page');
                        this.openStories();
                    }
                },
                {
                    text: 'Profile',
                    handler: () => {
                        console.log('profile clicked');
                        this.navCtrl.push(ProfilePage);
                    }
                },
                {
                    text: 'Logout',
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
                                        this.ionViewDidLoad();
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
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    async openStories() {
        this.navCtrl.push(StoriesPage);
    }
}
