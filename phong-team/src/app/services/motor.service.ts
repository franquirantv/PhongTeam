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

let renderer: THREE.WebGLRenderer, scene: THREE.Object3D, camera: THREE.Camera, stats;
let mesh;
let coche = "C:\Users\amban\PhongTeam\phong-team\src\assets\coches\Audi.gltf";
let camara1;
let camara2;
let camara3;
let camara4;
let camara5;
let numCamaras = 5;


// export function getDecals(){
//   return decals;
// }
@Injectable({
   providedIn: 'root'
})

export class EngineService {
public coche = "./../../../assets/coches/Audi2.gltf";

  constructor(private ngZone: NgZone
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
      renderer.setSize( window.innerWidth*0.85, window.innerHeight*0.85 );

    // stats = Stats();
    //// console.log("STATS",stats);
    // canv.appendChild( stats.dom );
    canv.appendChild( renderer.domElement);
    //// console.log("STATS",stats);
    scene = new THREE.Scene();

    
    if(window.innerWidth > 360 && window.innerWidth < 769 ){
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth/ window.innerHeight, 1, 1000 );
      camara1 = camera;
      scene.add(camara1);
      camara2 = camera;
      scene.add(camara2);
      camara3 = camera;
      scene.add(camara3);
      camara4 = camera;
      scene.add(camara4);
      camara5 = camera;
      scene.add(camara5);
    }
    else{
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth*0.85/ window.innerHeight, 1, 1000 );
      camera.position.z = 180;
      camera.position.y = 30;
      camara1 = camera;
      scene.add(camara1);
      camara2 = camera;
      scene.add(camara2);
      camara3 = camera;
      scene.add(camara3);
      camara4 = camera;
      scene.add(camara4);
      camara5 = camera;
      scene.add(camara5);
    }
    const controls = new OrbitControls( camera, renderer.domElement );


    scene.add( new THREE.AmbientLight( 0x443333,2) );

    

    var ambientLight = new THREE.AmbientLight(0xffffff, 1); // El segundo parámetro es la intensidad
    scene.add(ambientLight);

    // Crear una luz direccional (simula la luz del sol)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // El segundo parámetro es la intensidad
    directionalLight.position.set(1, 1, 0); // La posición de la luz direccional
    scene.add(directionalLight);
    
    this.CargarCoche();

  }




public CargarCoche() {

  const loader = new GLTFLoader();
  // console.log("MESH",mesh)
  let escenacoche;
  loader.load(this.coche , ( gltf ) => {
      escenacoche=gltf.scene;
      scene.add( escenacoche );
      escenacoche.scale.set( 25, 25, 25 ); //TAMAÑO COCHE

  });

}

public CrearGaleria(){
  let image = new Image();

  let imagenes = [];

  for(let i=0; i < numCamaras; i++){
    // Creamos el WebGLRenderTarget
    const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
      
    // Renderizamos la escena en el objeto de textura
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    
    // Creamos un elemento de lienzo donde copiamos el renderTarget
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Copiar el contenido del renderTarget al lienzo
    if (context) {
      context.canvas.width = renderTarget.width; // asignamos el ancho del canvas al lienzo
      context.canvas.height = renderTarget.height; // asignamos el alto del canvas al lienzo
      context.drawImage(renderTarget.texture.image, 0, 0);
      
      // Obtener la URL de datos
      const dataURL = canvas.toDataURL("image/png");
      console.log(dataURL);

      // Puedes usar dataURL como desees, por ejemplo, asignarlo a la fuente de una imagen
    
      image.src = dataURL;

      imagenes.push(image.src);
    }
  }
  return image.src;
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
  
  renderer.render( scene, camera );
  
}



}
