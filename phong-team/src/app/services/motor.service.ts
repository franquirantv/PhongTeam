import { ElementRef,Injectable,NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setLoadingSpinnerForDetails } from '../store/shared/shared.action';
import { Store } from '@ngrx/store';
import { SharedState } from '../store/shared/shared.state';

// const explo = new ExplorarComponent(
//   usuariosServiceInstance, // reemplaza usuariosServiceInstance con una instancia real de UsuariosService
//   routerInstance, // reemplaza routerInstance con una instancia real de Router
//   ngZoneInstance, // reemplaza ngZoneInstance con una instancia real de NgZone
//   /* proporciona otras instancias de servicios y dependencias necesarias */
// );

let renderer: THREE.WebGLRenderer, scene: THREE.Object3D, camera: THREE.Camera, stats;
let mesh;
let mainCamera: THREE.Camera;
let camara1: THREE.Camera;
let camara2: THREE.Camera;
let camara3: THREE.Camera;
let camara4: THREE.Camera;
let camara5: THREE.Camera;
let numCamaras = 5;


// export function getDecals(){
//   return decals;
// }
@Injectable({
  providedIn: 'root'
})

export class EngineService {
  angulo1:number = 0;
public coche = "";

  constructor(private ngZone: NgZone,
              private store: Store<SharedState>
              // public explo: ExplorarComponent
              ) {}


  public createScene(canvas: ElementRef<HTMLDivElement>): void {
    //// console.log("MESH",mesh);
    console.log(canvas)
   let canv = canvas.nativeElement;
    //// console.log("CANVASSS",canv);
    renderer = new THREE.WebGLRenderer( {antialias: true } );
     //// console.log("RENDERER",renderer);
     renderer.setPixelRatio( window.devicePixelRatio );
     //Para cuando es un movil y cuando no
     if(window.innerWidth > 360 && window.innerWidth < 769 )
      renderer.setSize( window.innerWidth, window.innerHeight );
     else
      renderer.setSize( window.innerWidth*0.75, window.innerHeight*0.75 );

    // stats = Stats();
    //// console.log("STATS",stats);
    // canv.appendChild( stats.dom );
    canv.appendChild( renderer.domElement);
    //// console.log("STATS",stats);
    scene = new THREE.Scene();


    if(window.innerWidth > 360 && window.innerWidth < 769 ){
      camara1 = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 ); //VISTA PLANTA
      camara1.position.z = -110;
      camara1.position.y = 30;
      camara1.position.x = 0;
      camara1.lookAt(0, 0, 0);
      scene.add(camara1);
      camara2 = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 ); //PARTE TRASERA
      camara2.position.z = 110;
      camara2.position.y = 30;
      camara2.position.x = 0;
      camara2.lookAt(0, 0, 0);
      scene.add(camara2);
      camara3 = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 ); //PARTE LATERAL2
      camara3.position.z = 0;
      camara3.position.y = 20;
      camara3.position.x = 50;
      camara3.lookAt(0, 0, 0);
      scene.add(camara3);
      camara4 = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 ); //PARTE DELANTERA
      camara4.position.z = 110;
      camara4.position.y = 30;
      camara4.position.x = 0;
      camara4.lookAt(0, 0, 0);
      scene.add(camara4);
      camara5 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE LATERAL 1
      camara5.position.z = 110;
      camara5.position.y = 30;
      camara5.position.x = 0;
      camara5.lookAt(0, 0, 0);
      scene.add(camara5);
      mainCamera = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE LATERAL 1
      mainCamera.position.z = -110;
      mainCamera.position.y = 30;
      mainCamera.position.x = 0;
      mainCamera.lookAt(0, 0, 0);
      scene.add(mainCamera);
    }
    else{
      camara1 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //VISTA PLANTA
      camara1.position.z = -110;
      camara1.position.y = 30;
      camara1.position.x = 0;
      camara1.lookAt(0, 0, 0);

      scene.add(camara1);
      camara2 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE TRASERA
      camara2.position.z = 110;
      camara2.position.y = 30;
      camara2.position.x = 0;
      camara2.lookAt(0, 0, 0);
      scene.add(camara2);
      camara3 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE LATERAL2
      camara3.position.z = -15;
      camara3.position.y = 40;
      camara3.position.x = 100;
      camara3.lookAt(0, 0, 0);

      scene.add(camara3);
      camara4 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE DELANTERA
      camara4.position.z = 110;
      camara4.position.y = 30;
      camara4.position.x = 0;
      camara4.lookAt(0, 0, 0);

      scene.add(camara4);
      camara5 = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE LATERAL 1
      camara5.position.z = 110;
      camara5.position.y = 30;
      camara5.position.x = 0;
      camara5.lookAt(0, 0, 0);

      scene.add(camara5);
      mainCamera = new THREE.PerspectiveCamera( 45, window.innerWidth*0.75/ window.innerHeight, 1, 1000 ); //PARTE LATERAL 1
      mainCamera.position.z = -110;
      mainCamera.position.y = 30;
      mainCamera.position.x = 0;
      mainCamera.lookAt(0, 0, 0);
      scene.add(mainCamera);
    }
    const controls = new OrbitControls( mainCamera, renderer.domElement );

    renderer.setClearColor( 0xffecb0, 1 );

    scene.add( new THREE.AmbientLight( 0x443333,2) );



    var ambientLight = new THREE.AmbientLight(0xffffff, 1); // El segundo parámetro es la intensidad
    scene.add(ambientLight);

    // Crear una luz direccional (simula la luz del sol)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // El segundo parámetro es la intensidad
    directionalLight.position.set(1, 1, 0); // La posición de la luz direccional
    scene.add(directionalLight);

    // this.CargarCoche();


  }



escenacoche:any;
public cargarCoche(file: File) {
  this.store.dispatch(setLoadingSpinnerForDetails({ status: true })); // Iniciar carga


  const loader = new GLTFLoader();
  // console.log("MESH",mesh)
  // let escenacoche;
  const reader = new FileReader();


  reader.onload = (data) => {
    const content = data.target?.result;

    if (content) {
      const gltfContent = JSON.parse(content as string);

      // Cargar el modelo GLTF
      loader.parse(gltfContent, '', (gltf) => {
        this.store.dispatch(setLoadingSpinnerForDetails({ status: false }));
        console.log(gltf);
        this.escenacoche=gltf.scene;

        scene.add(this.escenacoche);
        this.escenacoche.scale.set( 25, 25, 25 ); //TAMAÑO COCHE
      });
    }
  };

  reader.readAsText(file);
  // loader.load(ruta , ( gltf ) => {
  //     scene.add( escenacoche );

  // });


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

public render(): void {
  let frameId = requestAnimationFrame(() => {
    this.animate();
  });

  renderer.render( scene, mainCamera );
  // renderer.render( scene, camara2 );
  // renderer.render( scene, camara3 );
  // renderer.render( scene, camara4 );
  // renderer.render( scene, camara5 );

}
public imagenes:any = [];
captureScreenshots() {
  this.imagenes = [];
  // this.captureScreenshot(camara1, 'screenshot1.png');
  this.imagenes.push(this.captureScreenshot(camara1, 'screenshot1.png'));
  // this.captureScreenshot(camara2, 'screenshot2.png');
  this.imagenes.push(this.captureScreenshot(camara2, 'screenshot2.png'));
  // this.captureScreenshot(camara3, 'screenshot3.png');
  this.imagenes.push(this.captureScreenshot(camara3, 'screenshot3.png'));
  // this.captureScreenshot(camara4, 'screenshot4.png');
  this.imagenes.push(this.captureScreenshot(camara4, 'screenshot4.png'));
  // this.captureScreenshot(camara5, 'screenshot5.png');
  this.imagenes.push(this.captureScreenshot(camara5, 'screenshot5.png'));
  // Puedes seguir capturando más capturas desde otras cámaras según sea necesario.
  return this.imagenes;
}

captureScreenshot(camera: THREE.Camera, filename: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
  renderer.render(scene, camera);

  context?.drawImage(renderer.domElement, 0, 0, width, height);

  const dataURL = canvas.toDataURL('image/png');
  let image = new Image();
  image.src = dataURL;

  console.log(`Screenshot captured from camera ${camera.name}:`, dataURL);


  return image;
  // Puedes utilizar dataURL, por ejemplo, para mostrar la imagen en tu aplicación o guardarla.
  console.log(`Screenshot captured from camera ${camera.name}:`, dataURL);
}



}
