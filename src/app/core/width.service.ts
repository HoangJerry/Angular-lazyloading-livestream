import { Injectable } from '@angular/core';

@Injectable()
export class WidthService {
  public width: number;

  constructor() {
    this.width = window.innerWidth;
  }

  set_width(width: number) {
    this.width = width;
  }
}
