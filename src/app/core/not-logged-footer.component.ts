import { Component } from "@angular/core";
import { APP_NAME, TERMS, PRIVACY, HELP, HELP_CONTACT } from "../app.constants";
import { StaticPageService } from "../static-pages/static-page.service";

@Component({
  selector: "mcvod-not-logged-footer",
  templateUrl: "./not-logged-footer.html"
})
export class NotLoggedFooterComponent {
  public appName: string;
  public termsOfService: string;
  public privacyPolicy: string;
  public helpDesk: string;
  public helpContact: string;
  public showTermsOfUse: boolean;
  public showPrivacy: boolean;

  constructor(private staticPageService: StaticPageService) {
    this.appName = APP_NAME;
    this.termsOfService = TERMS;
    this.privacyPolicy = PRIVACY;
    this.helpDesk = HELP;
    this.helpContact = HELP_CONTACT;
  }

  /**
   * Open terms of use page
   */
  public openTermsOfUse() {
    this.showTermsOfUse = true;
    this.staticPageService.changeTermsOfUse(this.showTermsOfUse);
  }

  /**
   * Open privacy page
   */
  public openPrivacy() {
    this.showPrivacy = true;
    this.staticPageService.changePrivacy(this.showPrivacy);
  }
}
