import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {StoriesPage} from "../stories/stories";
import {NewStoryPage} from "../new-story/new-story";
import {Stats} from "../../utils/Stats";
import {ProfilePage} from "../profile/profile";
import {User} from "../../utils/User";


@IonicPage()
@Component({
    selector: 'page-all-stories',
    templateUrl: 'all-stories.html',
})
export class AllStoriesPage {

    private user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private actionSheetCtrl: ActionSheetController, public platform: Platform,
                private alertCtrl: AlertController, private storage: Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AllStoriesPage');
    }

    async storiesOptions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'STORIES MENU',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Refresh',
                    icon: !this.platform.is('ios') ? 'refresh' : null,
                    handler: () => {
                        this.refreshStories();
                    }
                },
                {
                    text: 'My Stories',
                    icon: !this.platform.is('ios') ? 'paper' : null,
                    handler: () => {
                        this.navCtrl.push(StoriesPage);
                    }
                },
                {
                    text: 'New Story',
                    icon: !this.platform.is('ios') ? 'add' : null,
                    handler: () => {
                        this.navCtrl.push(NewStoryPage);
                    }
                },
                {
                    text: 'More ...',
                    icon: !this.platform.is('ios') ? 'person' : null,
                    handler: () => {
                        this.openUserMenu();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    async refreshStories(){

    }

    async openUserMenu(){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'MY MENU',
            buttons: [
                {
                    text: 'Stories',
                    icon: 'paper',
                    handler: () => {
                        console.log('open stories page');
                        this.navCtrl.push(StoriesPage);
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
                                        //this.ionViewDidEnter();
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

}
