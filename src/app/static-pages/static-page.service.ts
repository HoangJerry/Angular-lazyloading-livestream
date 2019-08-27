import { Injectable } from '@angular/core';
import { Subject ,  Observable }    from 'rxjs';

@Injectable()
export class StaticPageService {
  public showTermsOfUse: boolean;
  public showTermsOfUseChangedAnnounced$: Observable<any>;
  public showPrivacy: boolean;
  public showPrivacyChangedAnnounced$: Observable<any>;
  private showTermsOfUseChanged: Subject<any> = new Subject<any>();
  private showPrivacyChanged: Subject<any> = new Subject<any>();

  constructor() {
    this.showTermsOfUseChangedAnnounced$ = this.showTermsOfUseChanged.asObservable();
    this.showTermsOfUse = false;
    this.showPrivacyChangedAnnounced$ = this.showPrivacyChanged.asObservable();
    this.showPrivacy = false;
  }

  /**
   * Show/hide terms of use
   */
  public changeTermsOfUse(showTermsOfUse: any) {
    this.showTermsOfUse = showTermsOfUse;
    this.showTermsOfUseChanged.next(showTermsOfUse);
  }

  /**
   * Show/hide privacy
   */
  public changePrivacy(showPrivacy: any) {
    this.showPrivacy = showPrivacy;
    this.showPrivacyChanged.next(showPrivacy);
  }
}
