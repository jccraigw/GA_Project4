import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	class1: any = "";
	score1: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  		this.class1 = this.navParams.get('class1');
  		this.score1 = this.navParams.get('score1');
  }

  // goToHomePage(){

  // 		//console.log('here')
  // 		this.navCtrl.push(HomePage, {}, {animate: true, direction: 'forward'});
  // 	}
}
