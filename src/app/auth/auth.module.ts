import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
// components
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordSuccessComponent } from "./reset-password/reset-password-success.component";
import { ResetPasswordConfirmComponent } from "./reset-password/reset-password-confirm.component";
import { ResetPasswordConfirmSuccessComponent } from "./reset-password/reset-password-confirm-success.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SignupStep1Component } from "./signup/signup-step-1.component";
import { SignupStep2Component } from "./signup/signup-step-2.component";
import { VerifyComponent } from "./verify/verify.component";
// services
import { SignupService } from "./signup/signup.service";
import { ResetPasswordService } from "./reset-password/reset-password.service";

import { ModalModule } from "ngx-modal";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ModalModule,
    FormsModule
  ],
  declarations: [
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    ResetPasswordConfirmComponent,
    ResetPasswordConfirmSuccessComponent,
    // DonorClaimComponent,
    LoginComponent,
    SignupComponent,
    SignupStep1Component,
    SignupStep2Component,
    VerifyComponent
  ],
  providers: [SignupService, ResetPasswordService]
})
export class AuthModule {}
