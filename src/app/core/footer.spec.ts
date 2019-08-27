/// <reference path="../../../typings/index.d.ts"/>

import { FooterComponent } from './footer.component';
import { TestBed, async } from '@angular/core/testing';

describe('footer component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FooterComponent]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });
});
