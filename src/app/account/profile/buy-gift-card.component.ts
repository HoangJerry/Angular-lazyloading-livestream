import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { APP_NAME, BASE_URL } from "../../app.constants";
import { ProfileService } from "./profile.service";

@Component({
  selector: "mcvod-buy-gift-card",
  templateUrl: "./buy-gift-card.html"
})
export class BuyGiftCardComponent {
  @Input() showGiftcardForm: boolean;
  @Input() showBuyGiftcard: boolean;
  @Output() onGiftcardFormOpenedChild = new EventEmitter<boolean>();
  @Output() onBuyGiftcardClosed = new EventEmitter<boolean>();
  public appName: string;
  public baseURL: string;

  constructor(
    private location: Location,
    private profileService: ProfileService
  ) {
    this.appName = APP_NAME;
    this.baseURL = BASE_URL;
  }

  /**
   * Show gift card modal
   */
  openGiftcardForm(): void {
    this.showGiftcardForm = true;
    this.onGiftcardFormOpenedChild.emit(this.showGiftcardForm);
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.showBuyGiftcard = false;
    this.onBuyGiftcardClosed.emit(this.showBuyGiftcard);
  }
}
