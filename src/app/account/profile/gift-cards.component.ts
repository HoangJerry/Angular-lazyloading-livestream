import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { APP_NAME, BASE_URL } from "../../app.constants";
import { ProfileService } from "./profile.service";

@Component({
  selector: "mcvod-gift-cards",
  templateUrl: "./gift-cards.html"
})
export class GiftCardsComponent {
  @Input() showGiftcardForm: boolean;
  @Output() onGiftcardFormOpened = new EventEmitter<boolean>();
  public appName: string;
  public baseURL: string;
  public showBuyGiftcard: boolean;
  public showRedeemGiftcard: boolean;

  constructor(
    private location: Location,
    private profileService: ProfileService
  ) {
    this.appName = APP_NAME;
    this.baseURL = BASE_URL;
  }

  /**
   * Deliver close giftcard modal event to parent
   */
  onGiftcardFormOpenedChild(opened: boolean) {
    this.showGiftcardForm = opened;
    this.onGiftcardFormOpened.emit(this.showGiftcardForm);
  }

  /**
   * Waiting close giftcard modal in child component
   */
  onBuyGiftcardClosed(closed: boolean) {
    this.showBuyGiftcard = closed;
  }

  /**
   * Waiting close redeem giftcard in child component
   */
  onRedeemGiftcardClosed(closed: boolean) {
    this.showRedeemGiftcard = closed;
  }

  /**
   * Show buy gift card box
   */
  showBuyGiftcardBox(): void {
    this.showBuyGiftcard = true;
  }

  /**
   * Show redeem giftcard box
   */
  showRedeemGiftcardBox(): void {
    this.showRedeemGiftcard = true;
  }
}
