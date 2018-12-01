import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  addVoice(){
    console.log("Voice added!");
  }

  report(){
    console.log("Alert reported!");
    this.viewCtrl.dismiss();
  }

  addImage() {
    console.log("Image added!")
  }
}
