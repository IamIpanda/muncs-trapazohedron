import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Link } from '../../core/link';
import { Data } from '../../core/data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messagePool: string = "";
  hintMessage: string = null;
  title: string = "null";
  footer: string = "";
  call: boolean = false;
  vote: boolean = false;

  constructor(public navCtrl: NavController) {
    Link.onMessage = this.onMessage.bind(this);
    Link.onSpeak = this.onSpeak.bind(this);
    Link.onOther = this.onOther.bind(this);
    Link.onCall = this.onCall.bind(this);
    Link.onVote = this.onVote.bind(this);
    this.title = Data.title;
    this.footer = Data.countryName;
  }

  onMessage(content) {
      this.messagePool += "\n\r" + content;
  }

  onSpeak(content) {
    this.hintMessage = content + "正在发言。";
    /*
    switch(content) {
      case 'ready':
        this.hintMessage = "你即将发言。";
      case 'go':
        this.hintMessage = "发言。";
      case 'remove':
        this.hintMessage = null;
    }
    */
  }

  onCall(content) {
    this.call = true;
  }

  onVote(content) {
    this.vote = true;
  }

  onOther(content) {
    let obj = JSON.parse(content);
    if (obj.type == "title")
      this.title = Data.title = obj.content;
  }
  
  executeCall(appearance: string) {
    Link.call(appearance);
    this.messagePool += `\n\r于点名中，${Data.countryName}${appearance == 'absent' ? "缺席" : "在席"}。\n\r`
    this.call = false;
  }

  executeVote(ticket: string) {
    Link.vote(ticket);
    let voteNames = {'approve': "赞成", 'oppose': "反对", 'abstain': "弃权", 'skip': "跳过"};
    if (ticket != 'skip')
      this.messagePool += `\n\r于投票中，${Data.countryName}投出了${voteNames[ticket]}票。\n\r`
    this.vote = false;
  }
}
