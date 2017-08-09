import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	
	imgUrl: any = "";
	bgColor: string = "redbackground";
	pictureTaken: boolean = false;
	pictureNotTaken: boolean = true;
	flashOn: boolean = false;
//
	constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, private sanitizer: DomSanitizer, private statusBar: StatusBar) {



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
		  quality: 100,
		}
		// take a picture
		this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
		  	let picture = 'data:image/jpeg;base64,' + imageData;
			this.imgUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + picture + ')');
		  	//console.log("picture ", picture);
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
}
