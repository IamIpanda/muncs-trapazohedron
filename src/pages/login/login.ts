import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Link } from '../../core/link';
import { Data } from '../../core/data';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public ipAddress: string;
  public country: string;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  async start() {
    console.log("CALL");
    Data.serverAddress = "http://" + this.ipAddress + ":59999/";
    let ok = await Link.info();
    if (ok) {
      console.log("SUCC");
      Data.countryName = this.country;
      Link.initialize();
      this.navCtrl.setRoot(HomePage);
    } else {
      console.log("FAIL");
      let toast = this.toastCtrl.create({
        message: "连接服务器失败。请确认主席团已启动 Nyarlathotep 服务器且会议已开始。",
        duration: 2000
      });
      toast.present();
    }
  }

}
