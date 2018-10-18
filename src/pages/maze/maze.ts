import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-maze',
  templateUrl: 'maze.html'
})
export class MazePage {

  obsMatrix: string[][] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeMatrix();
    this.obsMatrix = this.generateMatrix(16);
  }

  generateMatrix(index: number){
    for (let i = 0; i < index; i++) {
      let rand1 = Math.floor((Math.random() * (80 - 10)+10)/10);
      let rand2 = Math.floor((Math.random() * (80 - 10)+10)/10);
      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 8; k++) {
          if(j == 0 && k == 0){
            this.obsMatrix[j][k] = "start";
          }
          else if(j == 7 && k == 7){
            this.obsMatrix[j][k] = "end";
          }
          else if(j == rand1 && k == rand2){
            if(this.obsMatrix[j][k] == "obs"){
              this.obsMatrix[k][j] = "obs";
            }
            else{
              this.obsMatrix[j][k] = "obs";
            }
          }
          else{
            if(this.obsMatrix[j][k] != "obs"){
              this.obsMatrix[j][k] = "free";
            }
          }
        }
      }
    }
    return this.obsMatrix;
  }

  initializeMatrix(){
    for(var i: number = 0; i < 10; i++) {
      this.obsMatrix[i] = [];
      for(var j: number = 0; j< 10; j++) {
          this.obsMatrix[i][j] = "";
      }
  }
  }
}