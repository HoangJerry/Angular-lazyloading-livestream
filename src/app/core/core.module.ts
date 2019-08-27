import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// services
import { Logger } from "./logger.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth-guard.service";
import { HttpClient } from "./http-client.service";
import { LoadingService } from "./loading.service";
import { MenuService } from "./menu.service";
import { WidthService } from "./width.service";
// components
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer.component";
import { NotLoggedFooterComponent } from "./not-logged-footer.component";
import { SpinnerComponent } from "./spinner.component";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],

  declarations: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    NotLoggedFooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    NotLoggedFooterComponent
  ],
  providers: [
    Logger,
    AuthService,
    AuthGuard,
    HttpClient,
    LoadingService,
    MenuService,
    WidthService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
