import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";

@IonicPage()
@Component({
    selector: 'page-stay-tune',
    templateUrl: 'stay-tune.html',
})
export class StayTunePage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private actionSheetCtrl: ActionSheetController,  public platform: Platform) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StayTunePage');
    }

    async stOptions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'STORIES MENU',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: () => {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Play',
                    icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
                    handler: () => {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'Favorite',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Cancel',// will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
