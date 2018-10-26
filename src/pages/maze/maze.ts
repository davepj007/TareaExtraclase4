import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-maze',
  templateUrl: 'maze.html'
})
export class MazePage {
  
  index: number = 2;
  check: boolean = true;
  obsMatrix: string[][] = [];
  solMatrix: string[][] = [];

  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private alertCtrler: AlertController) {
    this.obsMatrix = this.initializeMatrix(this.obsMatrix);
    this.obsMatrix = this.generateMatrix(this.index);
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

  initializeMatrix(matrix: string[][]){
    for(var i: number = 0; i < 8; i++) {
      matrix[i] = [];
      for(var j: number = 0; j< 8; j++) {
          matrix[i][j] = "";
      }
    }
    return matrix;
  }

  isSafe(maze: string[][], i: number, j: number){
    if(i >= 0 && i < 8 && j >=0 && j < 8 && this.obsMatrix[i][j] == "free"){
      return true;
    }
    return false;
  }

  solveMaze(){
    this.solMatrix = this.initializeMatrix(this.solMatrix);
    if(this.solveMazeAux(this.solMatrix, 1, 0) == false){
      if(this.solveMazeAux(this.solMatrix, 0, 1) == false){
        this.openAlertMessage();
        return this.check = false;
      }
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.zone.runOutsideAngular(() => {
          const t = setInterval(() => {              
            if(t) clearInterval(t);                  
            if(this.solMatrix[i][j] == "go"){
              this.zone.run(()=>{
                this.obsMatrix[i][j] = "go";
              });            
            }
            else if(this.solMatrix[i][j] == "fail"){
              this.zone.run(()=>{
                this.obsMatrix[i][j] = "fail";
              });
            }
          }, 2500); 
        });
      }
    }

    this.zone.runOutsideAngular(() => {
      const t = setInterval(() => {
        this.zone.run(() => {
          if(t) clearInterval(t);    
          this.index+=2;
          this.initializeMatrix(this.obsMatrix);
          this.generateMatrix(this.index);
          this.solveMaze();
        });
      }, 3000);
    });
    return this.check = true;
  }

  solveMazeAux(maze: string[][], i: number, j: number){
    if(i == 7 && j == 7){
      return true;
    }

    if(this.isSafe(maze, i, j) == true){
      this.solMatrix[i][j] = "go";

      if(this.solveMazeAux(maze, i+1, j) == true){
        return true;
      }
      if(this.solveMazeAux(maze, i , j+1) == true){
        return true;
      }
      else{
        if(maze[i][j] != "obs"){
          this.solMatrix[i][j] = "fail";
          return false;
        }
        else{
          this.solMatrix[i][j] = "obs";
          return false;
        }
      }
    }

    return false;
  }

  openAlertMessage(){
    let addAlert = this.alertCtrler.create({
      title: "Solve Finished",
      message: "Route not found",
      buttons:[
        {
          text: "OK"
        }
      ]
    });
    addAlert.present(); 
  }
}