import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { AccountService } from "../account.service";
import { NotificationService } from "./notification.service";

@Component({
  selector: "mcvod-notification",
  templateUrl: "./notification.html"
})
export class NotificationComponent implements OnInit, OnDestroy {
  public appName: string;
  public settings: any;
  public errorMessage: any;
  public user: any;
  public subscription: Subscription;

  constructor(
    private location: Location,
    private notificationService: NotificationService,
    private accountService: AccountService
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.user = this.accountService.user;
    this.subscription = this.accountService.userChangedAnnounced$.subscribe(
      value => {
        this.user = value;
      }
    );
    this.getNotificationSettings();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Get viewing history
   */
  getNotificationSettings() {
    this.notificationService
      .getNotificationSettings()
      .subscribe(
        result => (this.settings = result),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Change Updates settings
   */
  onChangeUpdates() {
    this.settings.updates = !this.settings.updates;
  }

  /**
   * Change Newsletter settings
   */
  onChangeNewsletter() {
    this.settings.newsletter = !this.settings.newsletter;

    this.updateSettings();
  }

  /**
   * Change Offers settings
   */
  onChangeOffers() {
    this.settings.offers = !this.settings.offers;
  }

  /**
   * Change Send email settings
   */
  onChangeDoNotSend() {
    this.settings.doNotSend = !this.settings.doNotSend;
  }

  /**
   * Update settings
   */
  updateSettings() {
    if (!this.settings.matureLimit) this.settings.matureLimit = "PG";

    this.notificationService.updateSettings(this.settings).subscribe(
      result => {
        this.settings = result;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }
}
