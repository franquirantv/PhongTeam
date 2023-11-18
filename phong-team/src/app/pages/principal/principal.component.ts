import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  constructor() { }

  fileUploaded: File = new File([], '');
  fileRecieved: boolean = false;
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.fileUploaded = file;
    }
  }

  onUpload(){
    this.fileRecieved = true;
    console.log(this.fileUploaded);
  }

  resetUpload() {
    this.fileUploaded = new File([], '');
    this.fileRecieved = false;

  }


}
