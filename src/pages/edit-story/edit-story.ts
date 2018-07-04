import {Component, ViewChild} from '@angular/core';
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ViewController
} from 'ionic-angular';
import {User} from "../../utils/User";
import {Stats} from "../../utils/Stats";
import {SelectSearchableComponent} from "ionic-select-searchable";
import * as $ from 'jquery';
import {Misc} from "../../utils/Misc";
import {YA_API} from "../../utils/YA_API";

/**
 * Generated class for the EditStoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-story',
    templateUrl: 'edit-story.html',
})
export class EditStoryPage {

    @ViewChild('portComponent') portComponent: SelectSearchableComponent;
    private user: User;
    private story: any;
    public categories: any = Stats.CATEGORIES;
    public title: string;
    public body: string;
    public category: string;
    private loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loader: LoadingController, private alertCtrl: AlertController,
                private view: ViewController) {
        this.user = this.navParams.get('user');
        this.story = this.navParams.get('story');
        console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditStoryPage');

    }

    async openCats() {
        this.portComponent.open();
    }

    async portChange($event) {
        console.log($event.value.name);
        this.story.category = $event.value.name;
    }

    async editStory() {
        this.loading = this.loader.create({
            content: 'Creating story...'
        });
        this.loading.present();
        $.ajax({
            method: 'POST',
            url: YA_API.EDIT_STORY,
            timeout: 5000,
            data: {
                title: this.story.title,
                category: this.story.category,
                story: this.story.story,
                story_id: this.story.id,
                id: this.user.id,
                id_number: this.user.id_number
            }
        }).done(response => {
            Misc.presentAlert(this.alertCtrl, response.message);
            if (response.success) {
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
