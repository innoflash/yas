import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import * as jquery from 'jquery';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {StoriesPage} from "../stories/stories";
import {NewStoryPage} from "../new-story/new-story";
import {Stats} from "../../utils/Stats";
import {ProfilePage} from "../profile/profile";
import {User} from "../../utils/User";
import {YA_API} from "../../utils/YA_API";


@IonicPage()
@Component({
    selector: 'page-all-stories',
    templateUrl: 'all-stories.html',
})
export class AllStoriesPage {

    private user: User;
    public showStories: boolean = false;
    public networkError: boolean = false;
    public statusMessage: string;
    private storiesURL: string;
    private stories: any[];
    private currentPage: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private actionSheetCtrl: ActionSheetController, public platform: Platform,
                private alertCtrl: AlertController, private storage: Storage) {
        this.statusMessage = "Loading...";

        /*     this.storage.get(Stats.USER_PROFILE).then(user => {
                 this.user = User.getUser(user);
             }).catch(error => console.log(error));*/
    }

    ionViewDidLoad() {
        this.storage.get(Stats.USER_PROFILE).then(user => {
            this.user = User.getUser(user);
            this.stories = [];
            this.storiesURL = YA_API.ALL_STORIES;
            this.refreshStories(this.user);
        }).catch(error => console.log(error));
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
                        this.triggerRefresh();
                    }
                },
                {
                    text: 'My Stories',
                    icon: !this.platform.is('ios') ? 'paper' : null,
                    handler: () => {
                        this.navCtrl.push(StoriesPage, {
                            user: this.user
                        });
                    }
                },
                {
                    text: 'New Story',
                    icon: !this.platform.is('ios') ? 'add' : null,
                    handler: () => {
                        this.navCtrl.push(NewStoryPage, {
                            user: this.user
                        });
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

    async triggerRefresh() {
        this.storiesURL = YA_API.ALL_STORIES;
        this.stories = [];
        this.refreshStories(this.user);
    }

    async refreshStories(user: User) {
        jquery.ajax({
            method: 'POST',
            url: this.storiesURL,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number
            }
        }).done(response => {
            console.log(response);
            this.networkError = false;
            this.currentPage = response.current_page;
            response.data.forEach(function (story) {
                console.log(story);
                this.stories.push(story);
            });
            console.log(this.stories);
            /*if (this.stories.length == 0) {
                this.showStories = false;
                this.statusMessage = "No stories found !!!"
            } else {
                this.showStories = true;
            }*/
        }).fail(error => {
            console.log(error);
            this.statusMessage = Stats.FAILED_NETWORK;
            this.networkError = true;
        }).always(() => {

        });
    }

    async openUserMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'MY MENU',
            buttons: [
                {
                    text: 'Stories',
                    icon: 'paper',
                    handler: () => {
                        console.log('open stories page');
                        this.navCtrl.push(StoriesPage, {
                            user: this.user
                        });
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
