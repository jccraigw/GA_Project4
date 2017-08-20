import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = HomePage;
  statusbarPadding: false;

  constructor(private screenOrientation: ScreenOrientation,   platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private cameraPreview: CameraPreview) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.styleDefault();
      splashScreen.hide();
      const cameraPreviewOpts = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
        alpha: 1
      };

      
      this.cameraPreview.startCamera(cameraPreviewOpts).then(

        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });

    });
  }
}

