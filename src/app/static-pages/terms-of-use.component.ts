import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs';
import { APP_NAME, LOGO_COLOR } from '../app.constants';
import { StaticPageService } from './static-page.service';

@Component({
  selector: 'mcvod-terms-of-use',
  templateUrl: './terms-of-use.html'
})
export class TermsOfUseComponent implements OnInit, OnDestroy {
  public appName: string;
  public showTermsOfUse: boolean;
  public subscription: Subscription;

  constructor(private staticPageService: StaticPageService) {
    this.appName = APP_NAME;
    this.showTermsOfUse = true;
  }

  ngOnInit(): void {
    this.showTermsOfUse = this.staticPageService.showTermsOfUse;
    this.subscription = this.staticPageService.showTermsOfUseChangedAnnounced$.subscribe((value) => {
      this.showTermsOfUse = value;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Close terms of use page
   */
  public closeTermsOfUse() {
    this.showTermsOfUse = false;
    this.staticPageService.changeTermsOfUse(this.showTermsOfUse);
  }
}
