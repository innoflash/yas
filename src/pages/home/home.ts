import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Stats} from "../../utils/Stats";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    loginModal: Modal;

    constructor(public navCtrl: NavController, private storage: Storage,
                private modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.storage.get(Stats.authenticated).then(authed => {
            console.log(authed);
            if (authed == null || !authed) {
                const modalOptions: ModalOptions = {
                    enableBackdropDismiss: false
                };
                this.loginModal = this.modalCtrl.create(LoginPage, null, modalOptions);
                this.loginModal.present();
                this.loginModal.onDidDismiss(data => {
                    console.log(data);
                });
            }
        }).catch(error => console.log(error));
    }

}
