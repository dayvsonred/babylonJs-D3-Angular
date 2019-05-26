import { Component, OnInit, AfterViewInit } from '@angular/core';
/** Babylon basic imports - engine */ 
import 'babylonjs-materials';
import { EngineService } from './engine.service';




@Component({
  selector: 'app-patio-simples',
  templateUrl: './patio-simples.component.html',
  styleUrls: ['./patio-simples.component.css']
})
export class PatioSimplesComponent implements OnInit, AfterViewInit {

  private canEleId = 'renderCanvas'; /** Id renderizar html */

  /** contruo enginer */
  constructor(private engServ : EngineService) { 
  }

  ngOnInit() {
    // /** renderizo a pagina  */
    // this.engServ.createScene(this.canEleId);
    // this.engServ.animate();
    // console.log("patio worcks");
  }

  ngAfterViewInit() {
    // let game = new Game('renderCanvas');
    // game.createScene();
    // game.animate();

     /** renderizo a pagina  */
    this.engServ.createScene(this.canEleId);
    this.engServ.animate();
    console.log("patio worcks");


    // let game = new EngineService();
    // game.createScene('aa');
    // game.animate();


  }


}
