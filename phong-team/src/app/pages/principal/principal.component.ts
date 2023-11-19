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
    this.submitted = true;
    console.log(this.fileForm.valid)
    if (this.fileForm.valid) {
      this.fileForm.get('file')?.markAsTouched();

      if (this.fileUploaded) {
        // Verificar si el archivo es un archivo GLTF
        if (this.fileUploaded.type === 'model/gltf+json' || this.fileUploaded.name.endsWith('.gltf') || this.fileUploaded.name.endsWith('.glb')) {
          this.engServ.cargarCoche(this.fileUploaded);
          this.closeModal2();

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
  generarImagenes() {
    this.engServ.cargarCoche(this.fileUploaded);
    this.images = this.engServ.captureScreenshots();
    console.log(this.images);
  }

  selectedImage: string | null = null;

  openModal(image: string) {
    this.removeScroll();
    this.selectedImage = image;
  }

  closeModal() {
    this.addScroll();
    this.selectedImage = null;
  }

  downloadImage(url: string) {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nombre_de_tu_imagen'; // Puedes establecer un nombre aquí
      link.target = '_blank'; // Abre en una nueva ventana/tabla
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
