import {Component} from '@angular/core';
import * as $ from 'jquery';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NewStoryPage} from "../new-story/new-story";
import {User} from "../../utils/User";
import {Misc} from "../../utils/Misc";
import {Stats} from "../../utils/Stats";
import {YA_API} from "../../utils/YA_API";
import {StoryPage} from "../story/story";


@IonicPage()
@Component({
    selector: 'page-stories',
    templateUrl: 'stories.html',
})
export class StoriesPage {

    public showStories: boolean = false;
    public networkError: boolean = false;
    public stories: any;
    private loading: Loading;
    private user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loader: LoadingController, private alertCtrl: AlertController) {
    }

/*
    ionViewDidEnter(){
        this.ionViewDidLoad();
    }
*/

    ionViewDidEnter() {
        console.log('ionViewDidLoad StoriesPage');
        this.user = this.navParams.get('user');
        this.loading = this.loader.create({
            content: 'Getting your stories ..'
        });
        this.loading.present();
        $.ajax({
            method: 'POST',
            url: YA_API.GET_STORIES,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number
            }
        }).done(stories => {
            this.networkError = false;
            console.log(stories);
            if (stories.data.length == 0) {
                this.showStories = false;
            } else {
                this.showStories = true;
                this.stories = stories.data;
            }
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
            this.networkError = true;
            this.showStories = false;
        }).always(() => {
            this.loading.dismiss();
        });
    }

    async addStory() {
        this.navCtrl.push(NewStoryPage, {
            user: this.user
        });
    }

    async openStory(story: any) {
        console.log(story);
        this.navCtrl.push(StoryPage, {
            story_id: story.id,
            user: this.user
        });
    }
}
