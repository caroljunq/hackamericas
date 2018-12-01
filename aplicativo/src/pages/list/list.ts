import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  staticReports: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {
    this.addStaticReports();
  }

  addStaticReports(){
    this.staticReports.push({line: '9653-10', direction: 'Pedra Branca - Pça. do Correio', num_car: '11661',description: 'Pneu furado.', hour:'08:00',media_path: '../../assets/imgs/pneu_furado.jpg', type:'image'});
    this.staticReports.push({line: '9653-10', direction: 'Pedra Branca - Pça. do Correio', num_car: '11661',description: 'Pneu furado.', hour:'08:00',media_path: '../../assets/audio/a1.mp3', type:'audio'});
    this.staticReports.push({line: '9653-10', direction: 'Pedra Branca - Pça. do Correio', num_car: '11673',description: 'Retrovisor quebrado.', hour:'07:30',media_path: '../../assets/audio/a2.mp3', type:'audio'});
    this.staticReports.push({line: '9653-10', direction: 'Pedra Branca - Pça. do Correio', num_car: '11661',description: 'Porta não fecha direito, ônibus parou e vamos trocar.', hour:'18:15',media_path: '', type:'text'});
    this.staticReports.push({line: '9653-10', direction: 'Pedra Branca - Pça. do Correio', num_car: '11673',description: 'Lotação, talvez não dê pra passar.', hour:'06:46', media_path: '', type:'text'});
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }


}
