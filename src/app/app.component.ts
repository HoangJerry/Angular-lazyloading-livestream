import { ChangeDetectorRef, Component, NgZone } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "./app.constants";
import { StaticPageService } from "./static-pages/static-page.service";
import { MenuService } from "./core/menu.service";
import { WidthService } from "./core/width.service";
import { environment } from "../environments/environment";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "mcvod-app",
  templateUrl: "./app.component.html",
  providers: [StaticPageService]
})
export class AppComponent {
  public appName: string;
  public pageName: string;
  public hiddenNotloggedInFooter: boolean = true;

  constructor(
    public router: Router,
    public widthService: WidthService,
    private location: Location,
    private menuService: MenuService,
    private _zone: NgZone,
    private cdRef: ChangeDetectorRef,
    private swUpdate: SwUpdate
  ) {
    this.appName = APP_NAME;
    // removed ga google analytics script

    widthService.width = window.innerWidth;
    window.onresize = e => {
      _zone.run(() => {
        widthService.width = window.innerWidth;
      });
    };
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("Update Available. Please reload the page.")) {
          window.location.reload();
        }
      });
    }
  }

  public isHidden() {
    let list = [
        " ",
        "/login",
        "/reset-password",
        "/reset-password-success",
        "/claim-access",
        "/signup",
        "/signup/step2",
        "/signup/step3",
        "/activate"
      ],
      route = this.location.path();
    this.pageName = route;
    if (this.pageName.includes("reset-password-confirm")) {
      this.hiddenNotloggedInFooter = false;
    }
    if (
      route.indexOf("/reset-password-confirm") !== -1 ||
      route.indexOf("/create-password") !== -1
    ) {
      return true;
    }
    return list.indexOf(route) > -1;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
