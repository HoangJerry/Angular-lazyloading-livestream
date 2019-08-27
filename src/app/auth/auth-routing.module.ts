import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordSuccessComponent } from "./reset-password/reset-password-success.component";
import { ResetPasswordConfirmComponent } from "./reset-password/reset-password-confirm.component";
import { ResetPasswordConfirmSuccessComponent } from "./reset-password/reset-password-confirm-success.component";
// import { DonorClaimComponent } from './reset-password/donor-claim.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SignupStep1Component } from "./signup/signup-step-1.component";
import { SignupStep2Component } from "./signup/signup-step-2.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "login/:uid/:token",
        component: LoginComponent
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent
      },
      {
        path: "reset-password-success",
        component: ResetPasswordSuccessComponent
      },
      {
        path: "reset-password-confirm/:uid/:token",
        component: ResetPasswordConfirmComponent
      },
      {
        path: "reset-password-confirm-success",
        component: ResetPasswordConfirmSuccessComponent
      },
      // {
      //   path: 'claim-access',
      //   component: DonorClaimComponent
      // },
      {
        path: "signup",
        component: SignupComponent,
        children: [
          {
            path: "",
            component: SignupStep1Component
          },
          {
            path: "step2",
            component: SignupStep2Component
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
