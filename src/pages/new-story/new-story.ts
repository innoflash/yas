import {Component} from '@angular/core';
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ToastController,
    ViewController
} from 'ionic-angular';
import {User} from "../../utils/User";
import {Stats} from "../../utils/Stats";
import {Misc} from "../../utils/Misc";
import * as $ from 'jquery';
import {YA_API} from "../../utils/YA_API";

@IonicPage()
@Component({
    selector: 'page-new-story',
    templateUrl: 'new-story.html',
})
export class NewStoryPage {

    public categories: any = Stats.CATEGORIES;
    public title: string;
    public body: string;
    public category: string;
    public amount: number;
    private user: User;
    private story: any;
    private loading: Loading;
    private hasBlanks: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loader: LoadingController, private alertCtrl: AlertController,
                private view: ViewController, private toastCtrl: ToastController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewStoryPage');
        this.user = this.navParams.get('user');
    }

    async createStory() {
        this.hasBlanks = Misc.hasBlank([
            this.title,
            this.body,
            this.category,
            String(this.amount)
        ]);

        if (this.hasBlanks) {
            Misc.presentAlert(this.alertCtrl, Stats.FILL_BLANKS);
        } else {
            this.loading = this.loader.create({
                content: 'Creating story...'
            });
            this.loading.present();
            $.ajax({
                method: 'POST',
                url: YA_API.ADD_STORY,
                timeout: 5000,
                data: {
                    id: this.user.id,
                    id_number: this.user.id_number,
                    title: this.title,
                    category: this.category['name'],
                    story: this.body,
                    amount: this.amount
                }
            }).done(response => {
                console.log(response);
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

}
