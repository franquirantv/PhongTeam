import { Component, ElementRef, ViewChild } from '@angular/core';
import { EngineService } from 'src/app/services/motor.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  constructor( private engServ: EngineService) { }

  @ViewChild('motor', {static: true})
  public rendererCanvasRef!: ElementRef<HTMLDivElement>;

  fileUploaded: File = new File([], '');
  fileRecieved: boolean = false;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.fileUploaded = file;
    }
  }

  ngOnInit(): void {
  }

  onUpload(){
    this.fileRecieved = true;
    console.log(this.fileUploaded);
    this.engServ.createScene(this.rendererCanvasRef);
    this.engServ.animate();
  }

  resetUpload() {
    this.fileUploaded = new File([], '');
    this.fileRecieved = false;

  }


}
