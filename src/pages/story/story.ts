import {Component} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams, ViewController
} from 'ionic-angular';
import * as $ from 'jquery';
import {User} from "../../utils/User";
import {Stats} from "../../utils/Stats";
import {Misc} from "../../utils/Misc";
import {YA_API} from "../../utils/YA_API";
import {EditStoryPage} from "../edit-story/edit-story";

/**
 * Generated class for the StoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-story',
    templateUrl: 'story.html',
})
export class StoryPage {

    public story: any = {};
    private loading: Loading;
    private story_id: number;
    private user: User;
    public showStory: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loader: LoadingController,
                private actionSheetCtrl: ActionSheetController, private view: ViewController) {
        this.story.title = 'loading...';
        this.story.category = 'loading...';
        this.story.story = 'loading...';
        this.story.time = 'loading...';
        this.story.created_at = 'loading...';
    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad StoryPage');
        this.user = this.navParams.get('user');
        this.story_id = this.navParams.get('story_id');
        this.loading = this.loader.create({
            content: 'Opening your story ..'
        });
        this.loading.present();
        $.ajax({
            method: 'POST',
            url: YA_API.GET_STORY,
            timeout: 5000,
            data: {
                id: this.user.id,
                id_number: this.user.id_number,
                story_id: this.story_id
            }
        }).done(story => {
            console.log(this.story);
            this.story = story.data;
        }).fail(error => {
            console.log(error);
            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK);
        }).always(() => {
            this.loading.dismiss();
        });
    }

    async storyOptions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'STORY MENU',
            buttons: [
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        console.log('open stories page');
                        if (this.story.title != 'loading...') {
                            this.navCtrl.push(EditStoryPage, {
                                user: this.user,
                                story: this.story
                            });
                        }else{
                            Misc.presentAlert(this.alertCtrl, 'You can not edit a story that did not load !!!');
                        }
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Are you sure?',
                            message: 'Do you really wnat to delete this story out of Youth Amp right now?',
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
                                        this.loading = this.loader.create({
                                            content: 'Deleting your story ..'
                                        });
                                        this.loading.present();
                                        $.ajax({
                                            method: 'POST',
                                            url: YA_API.DEL_STORY,
                                            timeout: 5000,
                                            data: {
                                                id: this.user.id,
                                                id_number: this.user.id_number,
                                                story_id: this.story_id
                                            }
                                        }).done(data => {
                                            console.log(data);
                                            if (data.success) {
                                                this.view.dismiss();
                                            }else{
                                                Misc.presentAlert(this.alertCtrl, data.message);
                                            }
                                        }).fail(error => {
                                            console.log(error);
                                            Misc.presentAlert(this.alertCtrl, Stats.FAILED_NETWORK)
                                        }).always(() => {
                                            this.loading.dismiss();
                                        });
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
