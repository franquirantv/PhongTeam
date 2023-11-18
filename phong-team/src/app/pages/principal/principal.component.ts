import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EngineService } from 'src/app/services/motor.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor( private engServ: EngineService, private renderer: Renderer2, private fb: FormBuilder) { }
  private scrollPosition: number = 0;

  form = this.fb.group({
    file: [null]
  });

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvasRef!: ElementRef<HTMLDivElement>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.pageYOffset;
  }
  fileUploaded: File = new File([], '');

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.fileUploaded = file;
    }
  }

  onUpload(){
    this.closeModal2();
    if (this.fileUploaded) {
      // Verificar si el archivo es un archivo GLTF
      if (this.fileUploaded.type === 'model/gltf+json' || this.fileUploaded.name.endsWith('.gltf') || this.fileUploaded.name.endsWith('.glb')) {
        this.engServ.cargarCoche(this.fileUploaded);
      } else {
        console.error('Invalid file format. Please select a GLTF file.');
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
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'position');
    this.renderer.removeStyle(document.body, 'width');
  }

  removeScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'position', 'fixed');
    this.renderer.setStyle(document.body, 'width', '100%');
    window.scrollTo(0, this.scrollPosition);
  }


  ngOnInit(): void {
    this.removeScroll();
    this.engServ.createScene(this.rendererCanvasRef);
    this.engServ.animate();
  }


  resetUpload() {
    this.fileUploaded = new File([], '');
    this.openModal2();
  }

  //IMAGENES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  images = [
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    './../../../assets/spiderman.jpg',
    // ... más imágenes
  ];

  selectedImage: string | null = null;

  openModal(image: string) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
  }


}
