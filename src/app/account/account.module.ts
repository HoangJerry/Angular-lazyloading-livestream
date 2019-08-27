import { NgModule }       from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { SharedModule }  from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
// components
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { GiftCardsComponent } from './profile/gift-cards.component';
import { BuyGiftCardComponent } from './profile/buy-gift-card.component';
import { RedeemGiftCardComponent } from './profile/redeem-gift-card.component';
import { GiftCardFormComponent } from './profile/gift-card-form.component';
import { DeactivateAccountComponent } from './profile/deactivate-account.component';
import { EditProfileComponent } from './profile/edit-profile.component';
import { ChangeUsernameComponent } from './profile/change-username.component';
// import { DonationComponent } from './donation/donation.component';
// import { EditDonationComponent } from './donation/edit-donation.component';
// import { DonationAmountComponent } from './donation/donation-amount.component';
// import { InvoiceComponent } from './donation/invoice.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
// services
import { ProfileService } from './profile/profile.service';
// import { DonationService } from './donation/donation.service';
import { AccountService } from './account.service';
import { HistoryService } from './history/history.service';
import { NotificationService } from './notification/notification.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    ProfileComponent,
    GiftCardsComponent,
    BuyGiftCardComponent,
    RedeemGiftCardComponent,
    GiftCardFormComponent,
    DeactivateAccountComponent,
    EditProfileComponent,
    ChangeUsernameComponent,
    // DonationComponent,
    // EditDonationComponent,
    // DonationAmountComponent,
    // InvoiceComponent,
    HistoryComponent,
    NotificationComponent,
  ],
  providers: [
    ProfileService,
    // DonationService,
    AccountService,
    HistoryService,
    NotificationService
  ]
})

export class AccountModule {}
