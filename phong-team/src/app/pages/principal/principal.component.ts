import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EngineService } from 'src/app/services/motor.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor( private engServ: EngineService, private renderer: Renderer2) { }
  private scrollPosition: number = 0;

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

  showModal: boolean = true;

  openModal() {
    this.showModal = true;
    this.removeScroll();
  }

  closeModal() {
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

  onUpload(){
    this.closeModal();
    console.log(this.fileUploaded);
    // this.engServ.CrearGaleria();
    console.log(this.engServ.CrearGaleria());
  }

  resetUpload() {
    this.fileUploaded = new File([], '');
    this.openModal();
  }


}
