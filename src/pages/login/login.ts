import { Component } from '@angular/core';
import {IonicPage, Loading, NavController, NavParams} from 'ionic-angular';
import * as $ from 'jquery';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    public logoPic: string;
    public id_number: number;
    public idString: string;
    public password: string;
    loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.logoPic = "../../assets/imgs/logo.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
      this.idString = this.id_number + "";
      if (this.idString.length == 0 || this.password.length == 0) {
          console.log('fill in all blanks');
      }else{
        //TODO make an API call to login
      }
  }


}
