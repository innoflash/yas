import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the YatPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yat',
  templateUrl: 'yat.html'
})
export class YatPage {

  allStoriesRoot = 'AllStoriesPage'
  notificationsRoot = 'NotificationsPage'
  stayTuneRoot = 'StayTunePage'


  constructor(public navCtrl: NavController) {}

}
