import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


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
	noInfo: any = "";
	classes: any =[];

  constructor(private admobFree: AdMobFree, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, private statusBar: StatusBar) {

  		this.class1 = this.navParams.get('class1');
  		this.score1 = this.navParams.get('score1');
  		this.noInfo = this.navParams.get('noInfo');
  		this.classes = this.navParams.get('classes');
      this.showBanner();     
  }

  goToHomePage(){
      let navOptions = {
          animate: true,
          animation: 'ios-transition',
          duration:100,
          iosdelay:  100
       };
  		this.navCtrl.push(HomePage, {},navOptions);

  	}

  classSelected(name){
  		this.statusBar.hide();
  		const browser = this.iab.create('https://en.wikipedia.org/wiki/' + name);
  }

  showBanner() {
 
      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: true,
          id: 'ca-app-pub-4912988950997945/8393044626'
      };

      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {
          // success
      }).catch(e => console.log(e));
 
  }

}
