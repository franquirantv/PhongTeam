import { ElementRef,Injectable,NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const explo = new ExplorarComponent(
//   usuariosServiceInstance, // reemplaza usuariosServiceInstance con una instancia real de UsuariosService
//   routerInstance, // reemplaza routerInstance con una instancia real de Router
//   ngZoneInstance, // reemplaza ngZoneInstance con una instancia real de NgZone
//   /* proporciona otras instancias de servicios y dependencias necesarias */
// );

let renderer: THREE.WebGLRenderer, scene: THREE.Object3D<THREE.Event>, camera: THREE.Camera, stats;
let mesh;
let canv: { appendChild: (arg0: HTMLCanvasElement) => void; };


 
// export function getDecals(){
//   return decals;
// }
@Injectable({
   providedIn: 'root'
})

export class EngineService {
 

  constructor(private ngZone: NgZone
              // public explo: ExplorarComponent
              ) {}


  public createScene(canvas: ElementRef<HTMLDivElement>): void {
    //// console.log("MESH",mesh);
    canv = canvas.nativeElement;
    //// console.log("CANVASSS",canv);
    renderer = new THREE.WebGLRenderer( {antialias: true } );
     //// console.log("RENDERER",renderer);
     renderer.setPixelRatio( window.devicePixelRatio );
     //Para cuando es un movil y cuando no
     if(window.innerWidth > 360 && window.innerWidth < 769 )
      renderer.setSize( window.innerWidth, window.innerHeight );
     else
      renderer.setSize( window.innerWidth*0.5, window.innerHeight-1 );

    // stats = Stats();
    //// console.log("STATS",stats);
    // canv.appendChild( stats.dom );
    canv.appendChild( renderer.domElement);
    //// console.log("STATS",stats);
    scene = new THREE.Scene();
    

    if(window.innerWidth > 360 && window.innerWidth < 769 )
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 );
    else
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth*0.5/ window.innerHeight, 1, 1000 );
    camera.position.z = 180;
    camera.position.y = 30;

    const controls = new OrbitControls( camera, renderer.domElement );
  

    scene.add( new THREE.AmbientLight( 0x443333,2) );

    const dirLight1 = new THREE.DirectionalLight( 0xffddcc, 0.35 );
    dirLight1.position.set( 1, 0.75, 0.5 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0xccccff,  0.35);
    dirLight2.position.set( - 1, 0.75, - 0.5 );
    scene.add( dirLight2 );

    // scene.add( line );

   // this. escena();
   // console.log("COLOR:", this.colorear);
    this.loadLeePerrySmith();
   




public loadLeePerrySmith() {

  const loader = new GLTFLoader();
  // console.log("MESH",mesh);

  loader.load(this.personaje , function ( gltf ){
    mesh = gltf.scene.children[ 0 ];
    mesh.material = new THREE.MeshPhongMaterial({
      specular: 0x111111,
      color: obj.colorear,
      // map: textureLoader.load( './assets/humano/human_male_albedo.png' ),
      // map: textureLoader.load( './assets/painball/Map-COL.jpg' ),
      // specularMap: textureLoader.load( './assets/humano/human_male_bump.png' ),
      //  normalMap: textureLoader.load( './assets/humano/human_male_frecklemask.png' ),
      //  normalMap: textureLoader.load( './assets/humano/model.png' ),
      shininess: 25
    });
    
    // // console.log("MESIIIIII2",scene);

    scene.add( mesh );
    //// console.log("MESIIIIII3",scene);
    mesh.scale.set( 60, 60, 60 ); //CUERPO
    mesh.position.y= -65;//CUERPO
    // mesh.scale.set( 10, 10, 10 ); //CABEZA
    // mesh.position.y=-5;
  });

}

  

  public animate() {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
    });


  }

  public conta = 0;
  public render(): void {
    let frameId = requestAnimationFrame(() => {
      this.animate();
    });
   
    renderer.render( scene, camera );

  }

 

}
