import { Component, Inject, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { MenuService } from "../menu.service";
import { HELP, LOGO_WHITE } from "../../app.constants";
import { HttpClient } from "../http-client.service"
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "mcvod-navbar",
  templateUrl: "navbar.component.html",
  host: {
    "(document:click)": "onClick($event)"
  }
})
export class NavbarComponent {
  @ViewChild("search") el: ElementRef;

  public query: string;
  public isSearchActive: boolean;
  public isDropdownMenuActive: boolean;
  public dropdownOpen: boolean;
  public isMobileMenuActive: boolean;
  public helpDesk: string;
  public logoWhite: string;

  constructor(
    @Inject(Router) public router: Router,
    public authService: AuthService,
    private menuService: MenuService,
    private _eref: ElementRef,
    private http:HttpClient,
    private toastr: ToastrService,
  ) {
    this.query = "";
    this.isSearchActive = false;
    this.isDropdownMenuActive = false;
    this.isMobileMenuActive = false;
    this.dropdownOpen = false;
    this.helpDesk = HELP;
    this.logoWhite = LOGO_WHITE;

    router.events.subscribe(val => {
      this.isDropdownMenuActive = false;
    });
  }

  /**
   * Go to search page
   */
  gotoSearch() {
    this.router.navigate(["/search", this.query]);
    return false;
  }

  /**
   * Toggle side bar menu
   */
  toggleMobileMenu() {
    //let active = !this.menuService.active;
    //this.menuService.set_active(active);
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  /**
   * Toggle admin menu on larger screens
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Toggle search
   */
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.el.nativeElement.focus();
  }

  /**
   * Toggle dropdown
   */
  activateDropdownMenu() {
    this.isDropdownMenuActive = !this.isDropdownMenuActive;
  }

  /**
   * Close dropdown
   */
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target))
      // or some similar check
      this.isDropdownMenuActive = false;
  }
  /**
   * Goto live stream video
   */
  gotoVideo() {
    let videoId;
    this.http.get("/v2/content/livestreams/").subscribe((s:any)=>{
        let result:any = JSON.parse(s._body)
        try {
          let id  = result.results[0]._detail.match('/[0-9]+/');
          videoId = id[0].slice(1,-1)
          this.router.navigate(["/video", videoId, {id:videoId, play:true}]);
        }
        catch{
          this.toastr.error("No show at the current basis");
        }
      })
    return false;
  }
}
