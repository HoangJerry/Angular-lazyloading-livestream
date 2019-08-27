import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
// import { DonationComponent } from './donation/donation.component';
// import { InvoiceComponent } from './donation/invoice.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'my-account',
        canActivate: [AuthGuard],
        component: AccountComponent,
        children: [
          { path: '', redirectTo: '/my-account/profile', pathMatch: 'full' },
          {
            path: 'profile',
            component: ProfileComponent,
          },
          // {
          //   path: 'donation',
          //   component: DonationComponent,
          // },
          // {
          //   path: 'donation/invoice/:id',
          //   component: InvoiceComponent,
          // },
          {
            path: 'history',
            component: HistoryComponent,
          },
          {
            path: 'notification',
            component: NotificationComponent,
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AccountRoutingModule { }
