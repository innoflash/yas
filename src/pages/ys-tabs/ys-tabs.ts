import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AllStoriesPage} from "../all-stories/all-stories";
import {NotificationsPage} from "../notifications/notifications";
import {StayTunePage} from "../stay-tune/stay-tune";

/**
 * Generated class for the YsTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ys-tabs',
  templateUrl: 'ys-tabs.html',
})
export class YsTabsPage {

  public stories = AllStoriesPage;
  public notifications = NotificationsPage;
  public staytune = StayTunePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YsTabsPage');
  }

}
