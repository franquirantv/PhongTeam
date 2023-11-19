import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EngineService } from 'src/app/services/motor.service';
import { getLoadingDetails } from 'src/app/store/shared/shared.selector';
import { setLoadingSpinnerForDetails } from 'src/app/store/shared/shared.action';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/store/shared/shared.state';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor( private engServ: EngineService, private renderer: Renderer2,
    private fb: FormBuilder, private store: Store<SharedState>
    ) { }
  private scrollPosition: number = 0;

  submitted = false;

  showLoading$: Observable<boolean> | undefined;

  fileForm = this.fb.group({
    text: [''],
    fileName: ['', Validators.required],
    fileExtension: ['']
  });

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvasRef!: ElementRef<HTMLDivElement>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY;
  }
  fileUploaded: File = new File([], '');

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.fileUploaded = file;
      console.log(this.fileForm.valid);
      this.fileForm.get('fileName')?.setValue(file.name);
      const fileExtension = file.name.split('.').pop() || null;
      this.fileForm.get('fileExtension')?.setValue(fileExtension);
    }
  }

  onUpload(event: any){
    event.preventDefault();
    console.log(event)
    this.submitted = true;
    console.log(this.fileForm.valid)
    if (this.fileForm.valid) {
      this.fileForm.get('file')?.markAsTouched();

      if (this.fileUploaded) {
        // Verificar si el archivo es un archivo GLTF
        if (this.fileUploaded.type === 'model/gltf+json' || this.fileUploaded.name.endsWith('.gltf') || this.fileUploaded.name.endsWith('.glb')) {
          this.engServ.cargarCoche(this.fileUploaded);
          this.closeModal2();
          // this.fileForm.get('fileName')?.setValue(event.target.);

        } else {
          console.error('Invalid file format. Please select a GLTF file.');
        }
      }
    }
  }


  showModal: boolean = true;

  openModal2() {
    this.showModal = true;
    this.removeScroll();
  }

  closeModal2() {
    this.showModal = false;
    this.addScroll();
  }

  removeScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'position', 'fixed');
    this.renderer.setStyle(document.body, 'width', '100%');
    // window.scrollTo(0, this.scrollPosition);
  }

  addScroll(){
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'position');
    this.renderer.removeStyle(document.body, 'width');
  }


  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoadingDetails);
    this.removeScroll();
    this.engServ.createScene(this.rendererCanvasRef);
    this.engServ.animate();
  }


  resetUpload() {
    this.fileUploaded = new File([], '');
    this.fileForm.reset();
    this.openModal2();
  }


  images:any = [];
  async generarImagenes() {
    this.engServ.cargarCoche(this.fileUploaded);

    this.images = this.engServ.captureScreenshots('MIRA Q WAPO EL CARRO ESTE');

    // this.editImage(this.images[0]);
    console.log(this.images);
  }

  selectedImage: string | null = null;

  imagePosition: number | null = null;

  openModal(image: string, position: number) {
    this.removeScroll();
    this.selectedImage = image;
    this.imagePosition = position;
  }

  closeModal() {
    this.addScroll();
    this.selectedImage = null;
    this.imagePosition = null;
  }

  imagenDerecha() {
    if (this.selectedImage !== null && this.imagePosition !== null) {
      const newIndex = this.imagePosition + 1;
      if(newIndex<this.images.length){
        this.selectedImage = this.images[newIndex].currentSrc;
        this.imagePosition = newIndex;
      }else{
        const newIndex = 0;
        this.selectedImage = this.images[newIndex].currentSrc;
        this.imagePosition = newIndex;
      }
    }
  }

  imagenIzquierda() {
    if (this.selectedImage !== null && this.imagePosition !== null) {
      const newIndex = this.imagePosition - 1;
      if(newIndex<0){
        const newIndex = this.images.length -1;
        this.selectedImage = this.images[newIndex].currentSrc;
        this.imagePosition = newIndex;
      }else{
        this.selectedImage = this.images[newIndex].currentSrc;
        this.imagePosition = newIndex;
      }
    }
  }

  downloadImage(url: string) {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Banner'; // Puedes establecer un nombre aquí
      link.target = '_blank'; // Abre en una nueva ventana/tabla
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // editImage(img: HTMLImageElement) {
  //   // Lógica para agregar texto a la imagen
  //   console.log('Imagen sin editar:', img);

  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');

  //   const width = window.innerWidth;
  //   const height = window.innerHeight;

  //   canvas.width = width;
  //   canvas.height = height;

  //   context?.drawImage(renderer.domElement, 0, 0, width, height);

  //   const dataURL = canvas.toDataURL('image/png');
  //   let image = new Image();
  //   image.src = dataURL;

  //   let editedDataURL = canvas.toDataURL();


  //   // Puedes mostrar la imagen resultante o realizar otras acciones
  //   console.log('Imagen editada:', editedDataURL);
  // }
}
