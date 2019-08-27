import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { ToastrModule } from 'ngx-toastr';

// app root components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

// modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { VideoModule } from "./video/video.module";
import { PageNotFoundModule } from "./page-not-found/page-not-found.module";
import { StaticPageModule } from "./static-pages/static-page.module";

// // Library



// NGX Foundation Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    AccountModule,
    AuthModule,
    VideoModule,
    PageNotFoundModule,
    StaticPageModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      easing: 'ease-in',
      autoDismiss: true,
      closeButton: false,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent, HomeComponent],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
