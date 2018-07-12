import {Component} from '@angular/core';
import * as jquery from 'jquery';
import {
    ActionSheetController,
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {User} from "../../utils/User";
import {Stats} from "../../utils/Stats";
import {Misc} from "../../utils/Misc";
import {YA_API} from "../../utils/YA_API";
import {SocialSharing} from "@ionic-native/social-sharing";


@IonicPage()
@Component({
    selector: 'page-the-story',
    templateUrl: 'the-story.html',
})
export class TheStoryPage {

    private user: User;
    public first_name: string;
    public story: any;
    private story_id: number;
    private loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loader: LoadingController,
                private actionSheet: ActionSheetController, private socialSharing: SocialSharing,
                private toastCtrl: ToastController) {
    }

    ionViewDidEnter() {
        console.log(this.navParams.data);
        this.first_name = this.navParams.get('first_name');
        this.user = this.navParams.get('user');
        this.story_id = this.navParams.get('story_id');
        this.loading = this.loader.create({
            content: 'Loading the story'
        });
        this.loading.present();
        jquery.ajax({
            method: 'POST',
            url: YA_API.USER_STORY,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number,
                story_id: this.story_id
            }
        }).done(story => {
            console.log(story);
            this.story = story.data;
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
        }).always(() => {
            this.loading.dismiss();
        });
    }

    async reportStory() {
        let alert = this.alertCtrl.create({
            title: 'Reporting a story',
            message: 'Hey there, what could be wrong with this story?',
            inputs: [
                {
                    name: 'reason',
                    placeholder: 'write your report here...',
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
                    handler: (reason) => {
                        console.log(reason);
                    }
                }
            ]
        });
        alert.present();
    }

    async likeStory() {
        this.first_name = this.navParams.get('first_name');
        this.user = this.navParams.get('user');
        this.story_id = this.navParams.get('story_id');
        this.loading = this.loader.create({
            content: 'Liking the story'
        });
        this.loading.present();
        jquery.ajax({
            method: 'POST',
            url: YA_API.LIKE_STORY,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number,
                story_id: this.story_id
            }
        }).done(response => {
            console.log(response);
            Misc.presentAlert(this.alertCtrl, response.message);
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
        }).always(() => {
            this.loading.dismiss();
        });
    }

    async storyOptions() {
        let actionSheet = this.actionSheet.create({
            title: 'STORY MENU',
            buttons: [
                {
                    text: 'Like',
                    icon: 'thumbs-up',
                    handler: () => {
                        console.log('will like story');
                        this.likeStory()
                    }
                }, {
                    text: 'Share',
                    icon: 'share',
                    handler: () => {
                        console.log('sharing staff now');
                        this.shareStory();
                    }
                },
                {
                    text: 'Report',
                    icon: 'bug',
                    role: 'destructive',
                    handler: () => {
                        this.reportStory();
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

    async shareStory() {
        var nyaya: string = "YouthAmp Story\n\n" +
            "Author: " + this.story.user_name +
            "\nLevel: " + this.story.user_category +
            "\n\nTitle: " + this.story.title +
            "\nPledge: R" + this.story.amount +
            "\nCategory: " + this.story.category +
            "\nPosted: " + this.story.time +
            "\n\n" + this.story.story;
        this.socialSharing.share(nyaya, this.story.title, null, 'https://youthamp.com/stories/' + this.story.id).then(result => {
            console.log(result);
            Misc.presentToast(this.toastCtrl, 'Story shared successfully :D');
        }).catch(error => console.log(error));
    }
}
