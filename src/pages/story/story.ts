import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, NavController, NavParams} from 'ionic-angular';
import {User} from "../../utils/User";

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

    public story: any;
    private loading: Loading;
    private story_id: number;
    private user: User;
    public showStory: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StoryPage');
        this.user = this.navParams.get('user');
        this.story_id = this.navParams.get('story_id');
        console.log(this.navParams.data);
    }

    async storyOptions(){

    }
}
