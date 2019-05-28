import { Injectable } from '@angular/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  public canvas: HTMLCanvasElement;
  public engine: BABYLON.Engine;
  public cameraFREE: BABYLON.FreeCamera;
  public camera: BABYLON.ArcRotateCamera;
  public scene: BABYLON.Scene;
  public _light: BABYLON.Light;

  public sphere: BABYLON.Mesh;
  public terra: BABYLON.Mesh;
  public corAmarelo : any;
  public corAzul : any;
  public corVerde : any;
  public corVermelho : any;
  public corRoxo : any;

  constructor() {
  }

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    // this.canvas = <HTMLCanvasElement>document.getElementById(elementId);
    this.canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
    this.engine = new BABYLON.Engine(this.canvas,  true);  
    // Then, load the Babylon 3D engine:
    // this.engine = new BABYLON.Engine(this.canvas,  true);

    // create a basic BJS Scene object
    this.scene = new BABYLON.Scene(this.engine);
    // this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // create a FreeCamera, and set its position to (x:5, y:10, z:-20 )
    // this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(5, 10, -20), this.scene);
    // target the camera to scene origin
    // this.camera.setTarget(BABYLON.Vector3.Zero());
    // attach the camera to the canvas
    // this.camera.attachControl(this.canvas, false);
    
    this.camera = new BABYLON.ArcRotateCamera('camera1',  (Math.PI * 180) / 90, (Math.PI * 45) / 180, 50, new BABYLON.Vector3(0, 5,-10), this.scene);
    // Parameters: alpha, beta, radius, target position, scene
    // this.camera  = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);

    // Positions the camera overwriting alpha, beta, radius
    this.camera.setPosition(new BABYLON.Vector3((Math.PI / 2) *25 , (Math.PI /2) *25, 40));
    

    // This attaches the camera to the canvas
    this.camera.attachControl(this.canvas, false);


    //seta limite da terra para camera nao passar para baixo da terra
    this.camera.lowerBetaLimit = 0.1;
    this.camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    this.camera.lowerRadiusLimit = 30; //zoom limite



    // create a basic light, aiming 0,1,0 - meaning, to the sky
    // this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);


    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0.5,1,-1), this.scene);
    // this._light.diffuse = new Color3(1, 0, 0);
    this._light.intensity = 1;
    this._light.specular = new BABYLON.Color3(0, 1, 0); 


    // create a built-in "sphere" shape; its constructor takes 4 params: name, subdivisions, radius, scene
    this.sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);

    // create the material with its texture for the sphere and assign it to the sphere
    let spherMaterial = new BABYLON.StandardMaterial('sun_surface', this.scene);
    spherMaterial.diffuseTexture = new BABYLON.Texture('assets/textures/sun.jpg', this.scene);
    this.sphere.material = spherMaterial;
    this.corAmarelo = spherMaterial;

    // move the sphere upward 1/2 of its height
    this.sphere.position.y = 1;

    // simple rotation along the y axis
    let angle = 0.02;
    this.scene.registerAfterRender(() => {
      this.sphere.rotate (
        new BABYLON.Vector3(0, 1, 0),
        0.02,
        BABYLON.Space.LOCAL
      );
    });
  
    // generates the world x-y-z axis for better understanding
    //this.showWorldAxis(8);



    // this.terra = BABYLON.Mesh.CreateGround('ground1', 63, 50,  2, this.scene);
    //ground.material = cor2;
    //this.terra.material = texturTerrono;





    // this.Texturas();

    // this.cores();
    this.Terra();
 
    
    
    this.CriarCilindrosPosIni(0,0);this.CriarCilindrosPosIni(1,0);this.CriarCilindrosPosIni(2,0);this.CriarCilindrosPosIni(3,0);
    this.CriarCilindrosPosIni(0,1);this.CriarCilindrosPosIni(1,1);this.CriarCilindrosPosIni(2,1);this.CriarCilindrosPosIni(3,1);
    this.CriarCilindrosPosIni(0,2);this.CriarCilindrosPosIni(1,2);this.CriarCilindrosPosIni(2,2);this.CriarCilindrosPosIni(3,2);
    this.CriarCilindrosPosIni(0,3);this.CriarCilindrosPosIni(1,3);this.CriarCilindrosPosIni(2,3);this.CriarCilindrosPosIni(3,3);
    

    for (let index = 6; index < 11; index++) {
      for (let index_l = 0; index_l < 4; index_l++) { 
        this.CriarCilindrosPosIni(index,index_l);
      }
    }


    for (let index = 12; index < 15; index++) {
      for (let index_l = 0; index_l < 4; index_l++) { 
        this.CriarCilindrosPosIni(index,index_l);
      }
    }


    for (let index = 7; index < 11; index++) {
      for (let index_l = 0; index_l < 5; index_l++) { 
        this.CriarCilindrosPosIni(index_l,index);
      }
    }


    for (let index = 12; index < 16; index++) {
      for (let index_l = 0; index_l < 5; index_l++) { 
        this.CriarCilindrosPosIni(index_l,index);
      }
    }
    
    
    // let ponte  = this.Ponte();
    this.ExeIniAnimations();

  }

  animate(): void {
    const $scope = this;

    window.addEventListener('DOMContentLoaded', () => {
      $scope.engine.runRenderLoop( () => {
        $scope.scene.render();
      });
    });

    window.addEventListener('resize', () => {
      $scope.engine.resize();
    });
  }

  // animate() : void {
  //   // run the render loop
  //   this.engine.runRenderLoop(() => {
  //       this.scene.render();
  //   });
  
  //   // the canvas/window resize event handler
  //   window.addEventListener('resize', () => {
  //       this.engine.resize();
  //   });
  //   }  


  ExeIniAnimations(){

    let ponte  = this.Ponte();
    

    // setTimeout(function(){  this.ExeIniAnimations(ponte); }, 4000);
    setTimeout(async () => {this.AnimPonte_Mov(ponte);}, 4000);
    
    //   setTimeout(async () => {
    //     // var anim = this.scene.beginAnimation(box1, 0, 200, false);
    
    //     // console.log("before");
    //     // await anim.waitAsync();
    //     // console.log("after");
    // });
  }


  cores(){
    var vermelho = new BABYLON.StandardMaterial("redMat", this.scene);
    vermelho.emissiveColor = new BABYLON.Color3(1,0,0);
 
    var verde = new BABYLON.StandardMaterial("verdeMat", this.scene);
    verde.emissiveColor = new BABYLON.Color3(0,1,0);
 
    var verde2 = new BABYLON.StandardMaterial("verde2Mat", this.scene);
    verde2.emissiveColor = new BABYLON.Color3((57/255),(203/255),(64/255));
 
    var azul = new BABYLON.StandardMaterial("azulMat", this.scene);
    azul.emissiveColor = new BABYLON.Color3((15/255),(13/255),(243/255));
 
    this.corAmarelo = new BABYLON.StandardMaterial("amareloMat", this.scene);
    this.corAmarelo.emissiveColor = new BABYLON.Color3((210/255),(181/255),0);
 
 
    var preto = new BABYLON.StandardMaterial("pretoMat", this.scene);
    preto.emissiveColor = new BABYLON.Color3((18/255),(10/255),(44/255));
  }




  /**
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */
  showWorldAxis (size: number) {
    let $scope = this;

    let makeTextPlane = function(text: string, color: string, textSize: number) {
      let dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, $scope.scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color , 'transparent', true);
      let plane = BABYLON.Mesh.CreatePlane('TextPlane', textSize, $scope.scene, true);
      let material = new BABYLON.StandardMaterial('TextPlaneMaterial', $scope.scene);
      material.backFaceCulling = false;
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
      plane.material = material;

      return plane;
    };

    let axisX = BABYLON.Mesh.CreateLines(
      'axisX',
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene
    );

    axisX.color = new BABYLON.Color3(1, 0, 0);
    let xChar = makeTextPlane('X', 'red', size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    let axisY = BABYLON.Mesh.CreateLines(
      'axisY',
      [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
      ],
      this.scene
    );

    axisY.color = new BABYLON.Color3(0, 1, 0);
    let yChar = makeTextPlane('Y', 'green', size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    let axisZ = BABYLON.Mesh.CreateLines(
      'axisZ',
      [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
      ],
      this.scene
    );

    axisZ.color = new BABYLON.Color3(0, 0, 1);
    let zChar = makeTextPlane('Z', 'blue', size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
  }



  Texturas(){
    var texturTerrono = new BABYLON.StandardMaterial("ground",  this.scene);
    texturTerrono.diffuseTexture = new BABYLON.Texture("assets/textures/ground.jpg",  this.scene);
     //    texturTerrono.diffuseColor = new Color3(1, 0, 0);
     texturTerrono.diffuseTexture.wrapU = 6;
     texturTerrono.diffuseTexture.wrapV = 6;
     texturTerrono.specularColor = new BABYLON.Color3(0, 0, 0)
  }

  /** Criando terra 
  * criação simples falta add limit na camera para ver apenasate a base
  */
  Terra(){

    // texturas
   var texturTerrono = new BABYLON.StandardMaterial("ground",  this.scene);
   texturTerrono.diffuseTexture = new BABYLON.Texture("assets/textures/ground.jpg",  this.scene);
    //    texturTerrono.diffuseColor = new Color3(1, 0, 0);
    texturTerrono.diffuseTexture.wrapU = 6;
    texturTerrono.diffuseTexture.wrapV = 6;
    texturTerrono.specularColor = new BABYLON.Color3(0, 0, 0)

    let ground = BABYLON.Mesh.CreateGround('ground1',   80, 120,  2, this.scene);
    //   //ground.material = cor2;
      ground.material = texturTerrono;
 
  }


  Ponte(){

    let ponte = BABYLON.Mesh.CreateBox('PontBase', 3,  this.scene);
    ponte.position.x = 1;
    ponte.position.y = 7;
    ponte.position.z = 0;
    ponte.material = this.corAmarelo;

    return ponte;
    // coluna4.material = amarelo;



  }

  /** Move a ponte para uma determinada posicao 
   * 
  */
  AnimPonte_Mov(i){

     //Create a scaling animation at 30 FPS
    var animationBox = new BABYLON.Animation("PonteAnimation", "position.x", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    // Animation keys
    var keys = [];
    //At the animation key 0, the value of scaling is "1"
    keys.push({
        frame: 0,
        value: 1
    });

    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 50,
        value: -15
    });

    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 100,
        value: -30
    });

    animationBox.setKeys(keys); 



    var animationBox2 = new BABYLON.Animation("PonteAnimation2", "position.z", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    // Animation keys
    var keys2 = [];
    keys2.push({ frame: 0,value: 0 });
    keys2.push({   frame: 50,  value: 15 }); 
    keys2.push({ frame: 100, value: 30 });

    animationBox2.setKeys(keys2);

    i.animations.push(animationBox);
    i.animations.push(animationBox2); 






    // var anim = this.scene.beginAnimation(i, 0, 200, false);

    // console.log("before");
    // await anim.waitAsync();
    // console.log("after");

    
    setTimeout(async () => {
      var anim = this.scene.beginAnimation(i, 0, 100, false); 
      

      console.log("before");
      await anim.waitAsync();
      // i.position.x = -30;
      // this.AnimPonte_Mov_2(i);
      console.log("after");
    });

  }



  AnimPonte_Mov_2(i){

   var animationBox = new BABYLON.Animation("PonteAnimation2", "position.z", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
   // Animation keys
   var keys = [];
   keys.push({ frame: 0,value: 0 });
   keys.push({   frame: 50,  value: 15 }); 
   keys.push({ frame: 100, value: 30 });

   animationBox.setKeys(keys);

   i.animations.push(animationBox);

   var anim = this.scene.beginAnimation(i, 0, 100, false);

   // console.log("before");
   // await anim.waitAsync();
   // console.log("after");

 }





  /**
   * cria cilindros na posição inicial
   * @param Coluna coluna da matrix number ini 0
   * @param Linha linha da matrix
   */
  CriarCilindrosPosIni(Coluna, Linha){

    let posX = 35; // move para esqueda direita
    let posY = 1; // move para cima e baixo
    let posZ = 40; // move para traz e fente
    let NameCilindre = "cylindre_"+Coluna+"_"+Linha;


    let MargenColunas = 4;
    let MargenLinhas = 4;

    posX = (posX - (MargenColunas * Coluna))*-1;
    posZ = (posZ - (MargenLinhas * Linha));


    let cylindro1 = BABYLON.Mesh.CreateCylinder(NameCilindre, 2, 2, 2, 20, 6 , this.scene)
    cylindro1.rotation.x = (Math.PI * 90) /180;
    cylindro1.position.x = posX;
    cylindro1.position.y = posY;
    cylindro1.position.z = posZ;




  }


  
}
