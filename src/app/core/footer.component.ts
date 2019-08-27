import { Component } from "@angular/core";
import { APP_NAME, TERMS, PRIVACY, HELP, HELP_CONTACT } from "../app.constants";
import { StaticPageService } from "../static-pages/static-page.service";

@Component({
  selector: "mcvod-footer",
  templateUrl: "./footer.html"
})
export class FooterComponent {
  public text: string;
  public appName: string;
  public termsOfService: string;
  public privacyPolicy: string;
  public helpDesk: string;
  public helpContact: string;
  public showTermsOfUse: boolean;
  public showPrivacy: boolean;

  constructor(private staticPageService: StaticPageService) {
    this.text = "My brand new component!";
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
