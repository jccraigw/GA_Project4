import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { DetailPage } from '../detail/detail';
import {Gesture} from 'ionic-angular/gestures/gesture';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	
	imgUrl: any = "";
	class: any = "";
	score: any = "";x
	imgUrl3: any = "";
	watson: any = {};
	imglink: any = "";
	bgColor: string = "redbackground";
	pictureTaken: boolean = false;
	pictureNotTaken: boolean = true;
	pictureImgur: boolean = false;
	flashOn: boolean = false;
	infoLoading: boolean = false;
	detailPage = DetailPage;
	noInfo: string = "No new info 😢";
	classes = [];
	zoomNum: number = 1;
	private imageSrc: string;
		
//
	constructor(private camera: Camera, private photoLibrary: PhotoLibrary, private admobFree: AdMobFree, private screenOrientation: ScreenOrientation, public navCtrl: NavController, private cameraPreview: CameraPreview, private sanitizer: DomSanitizer, private statusBar: StatusBar, private http: HTTP) {
		this.newPhoto();
		this.admobFree.banner.remove();
		this.cameraPreview.setFlashMode('off');
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		this.zoomNum = 1;
		this.cameraPreview.setZoom(1);
		
  	}
 
  	goToDetailPage(){
  		this.newPhoto();
  		this.navCtrl.push(DetailPage, {noInfo: this.noInfo});
  	}

  	reverseCamera(){

 		this.cameraPreview.switchCamera();
  	}
  	zoomIn(){
  		console.log('zoomNum: ', this.zoomNum)
  		this.cameraPreview.setZoom(this.zoomNum = this.zoomNum + 1);
  	}
  	zoomOut(){
  		console.log('zoomNum: ', this.zoomNum)
  		if(this.zoomNum > 1){
  			this.cameraPreview.setZoom(this.zoomNum = this.zoomNum - 1);
  		}
  	}

  	flash(){

  		this.flashOn = false;
		this.cameraPreview.setFlashMode('off');	
  	}

  	noFlash(){

  		this.flashOn = true;
		this.cameraPreview.setFlashMode('on');	
  	}

	takePicture(){

	
		this.bgColor = "blackbackground";
		this.statusBar.hide();
	
		const pictureOpts: CameraPreviewPictureOptions = {

			width: 1280,
		  	height: 1920,
		  	quality: 100,
		}
		// take a picture
		this.cameraPreview.takePicture(pictureOpts).then((imageData) => {

			this.pictureTaken = true;
			this.pictureNotTaken= false;
			this.pictureImgur= true;
			this.imgUrl3= imageData;
		  	let picture = 'data:image/jpeg;base64,' + imageData;
		  	console.log("picture: ", this.imgUrl3[0]);
			this.imgUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + picture + ')');
		}, (err) => {

		 	console.log(err);
		  	let picture = 'assets/img/test.jpg';
		});
	}
	uploadPic(){

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
 			// Handle error
		});
	}

	newPhoto(){

		this.pictureNotTaken = true;
		this.pictureTaken = false;
		this.infoLoading = false;
		this.statusBar.show();
		this.imgUrl = ' ';
	}

	getInfo(){

		this.pictureImgur = false;
		this.infoLoading = true;

		this.http.post('https://imgur-apiv3.p.mashape.com/3/image', {'image': this.imgUrl3[0]}, {'Authorization': 'Client-ID ' + IMGUR_APIKEY, 'X-Mashape-Key': MASH_APIKEY } ).then(data =>{

	 		this.infoLoading = false;
	 		this.imglink = JSON.parse(data.data);
	 		console.log(this.imglink['data']['link']);
	 		this.callWatson();
	 		

		 }).catch(error => {

    		console.log(error.status);
   			console.log(error.error); // error message as string
    		console.log(error.headers);

  		});

	}

	callWatson(){
		this.http.get('https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=' + API_URL + '&url=' + this.imglink['data']['link'] + '&version=2016-05-20', {}, {})
  		.then(data => {

  			this.watson= JSON.parse(data.data);
  			console.log("watson : ", this.watson['images'][0]['classifiers'][0]['classes'][0]['class'])

  			for(let i = 0; i < this.watson['images'][0]['classifiers'][0]['classes'].length; i++){

  				this.classes.push({class: this.watson['images'][0]['classifiers'][0]['classes'][i]['class'], score: Math.round(this.watson['images'][0]['classifiers'][0]['classes'][i]['score'] * 100)});			

  			}
  			this.class = this.watson['images'][0]['classifiers'][0]['classes'][0]['class'];
  			this.score = parseInt(this.watson['images'][0]['classifiers'][0]['classes'][0]['score']) * 100;
	    	console.log(data.status);
	    	console.log(data.data); // data received by server
	    	console.log(data.headers);

	    	this.navCtrl.push(DetailPage, {
    			class1: this.class,
    			score1: this.score,
    			classes: this.classes
			});
	    	this.newPhoto();	

  		})
  		.catch(error => {

    		console.log(error.status);
   			console.log(error.error); // error message as string
    		console.log(error.headers);

  		});
	}

}
