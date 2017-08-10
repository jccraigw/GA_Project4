import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	
	imgUrl: any = "";
	class: any = "";
	imgUrl2: any ="";
	imgUrl3: any = "";
	watson: any = {};
	imglink: any = "";
	bgColor: string = "redbackground";
	pictureTaken: boolean = false;
	pictureNotTaken: boolean = true;
	flashOn: boolean = false;
//
	constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, private sanitizer: DomSanitizer, private statusBar: StatusBar, private http: HTTP) {



  }

  	reverseCamera(){
 		this.cameraPreview.switchCamera();
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
		this.pictureTaken = true;
		this.pictureNotTaken= false;
		this.bgColor = "blackbackground";
		this.statusBar.hide();
		const pictureOpts: CameraPreviewPictureOptions = {
			width: 1280,
		  	height: 1920,
		  	quality: 90,
		}
		// take a picture
		this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
			this.imgUrl3= imageData;
		  	let picture = 'data:image/jpeg;base64,' + imageData;
		  	this.imgUrl2 = picture;
		  	console.log("picture: ", this.imgUrl3[0]);
			this.imgUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + picture + ')');
		  	//console.log("imgUrl: ", this.imgUrl);
		  	//this.cameraPreview.stopCamera();
		}, (err) => {
		 	console.log(err);
		  	let picture = 'assets/img/test.jpg';
		});
	}

	newPhoto(){
		this.pictureNotTaken = true;
		this.pictureTaken = false;
		this.statusBar.show();
		this.imgUrl = ' ';
	}

	getInfo(){
		 	
		 this.http.post('https://api.imgur.com/3/image', {'image': this.imgUrl3[0]}, {'Authorization': 'Client-ID 87bc75c6b87b4fe'} ).then(data =>{

		 		this.imglink = JSON.parse(data.data);

		 		console.log(this.imglink['data']['link']);

		 }).catch(error => {

    		console.log(error.status);
   			console.log(error.error); // error message as string
    		console.log(error.headers);

  		});

		this.http.get('https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=8dbd7021ec5cc452e8b257418117bf84c39f65fe&url=' + this.imglink['data']['link'] + '&version=2016-05-20', {}, {})
  		.then(data => {

  			this.watson= JSON.parse(data.data);
  			console.log("watson : ", this.watson['images'][0]['classifiers'][0]['classes'][0]['class'])
  			this.class = this.watson['images'][0]['classifiers'][0]['classes'][0]['class'];
	    	console.log(data.status);
	    	console.log(data.data); // data received by server
	    	console.log(data.headers);

  		})
  		.catch(error => {

    		console.log(error.status);
   			console.log(error.error); // error message as string
    		console.log(error.headers);

  		});
	}
}
