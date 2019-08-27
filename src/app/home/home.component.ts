import {Component} from '@angular/core';

@Component({
  selector: 'mcvod-home',
  templateUrl: './home.html'
})
export class HomeComponent {
  public text: string;
  public macbookImage: string;

  constructor() {
    this.text = '';
    this.macbookImage = '';
  }
}
