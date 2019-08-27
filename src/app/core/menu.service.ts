import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  public active: boolean;

  constructor() {
    this.active = false;
  }

  set_active(active: boolean) {
    this.active = active;
  }
}
