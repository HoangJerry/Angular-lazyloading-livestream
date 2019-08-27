import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs';
import { APP_NAME, LOGO_COLOR } from '../app.constants';
import { StaticPageService } from './static-page.service';

@Component({
  selector: 'mcvod-privacy',
  templateUrl: './privacy.html'
})
export class PrivacyComponent implements OnInit, OnDestroy {
  public appName: string;
  public showPrivacy: boolean;
  public subscription: Subscription;

  constructor(private staticPageService: StaticPageService) {
    this.appName = APP_NAME;
    this.showPrivacy = true;
  }

  ngOnInit(): void {
    this.showPrivacy = this.staticPageService.showPrivacy;
    this.subscription = this.staticPageService.showPrivacyChangedAnnounced$.subscribe((value: boolean) => {
      this.showPrivacy = value;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Close privacy page
   */
  public closePrivacy() {
    this.showPrivacy = false;
    this.staticPageService.changePrivacy(this.showPrivacy);
  }
}
