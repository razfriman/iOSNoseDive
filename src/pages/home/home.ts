import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  context: AudioContext;
  audioBuffer = {};

  constructor(public navCtrl: NavController) {

    var w = window as any;
    if (w.AudioContext) {
		  this.context = new w.AudioContext();
	  } else if (w.webkitAudioContext) {
      this.context = new w.webkitAudioContext();
    }


  this.loadFile('assets/audio/nosedive_1_stars.mp3', 'star1');
  this.loadFile('assets/audio/nosedive_2_stars.mp3', 'star2');
  this.loadFile('assets/audio/nosedive_3_stars.mp3', 'star3');
  this.loadFile('assets/audio/nosedive_4_stars.mp3', 'star4');
  this.loadFile('assets/audio/nosedive_5_stars.mp3', 'star5');
  }


  loadFile(url: string, key: string) {
    let xhr = new XMLHttpRequest()
        xhr.onload = () => {
          this.context.decodeAudioData(xhr.response, (buffer) => {
            this.audioBuffer[key] = buffer;
          })
        }
        xhr.open("GET", url, true)
        xhr.responseType = 'arraybuffer';
        xhr.send()
  }

  

  playSound(starCount: number) {
     const name = "star" + starCount;
     console.log(name);
     var source = this.context.createBufferSource();
     source.buffer = this.audioBuffer[name];
     source.connect(this.context.destination);
     source.start(0);
  }

}
