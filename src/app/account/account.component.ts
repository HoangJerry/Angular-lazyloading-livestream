import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../app.constants";
import { AccountService } from "./account.service";
import { Logger } from "../core/logger.service";

@Component({
  selector: "mcvod-account",
  templateUrl: "./account.html",
  providers: [AccountService]
})
export class AccountComponent implements OnInit {
  public appName: string;
  public user: any;

  constructor(
    private location: Location,
    private accountService: AccountService,
    private logger: Logger
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  /**
   * Get logged in user
   */
  getLoggedUser() {
    this.accountService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.accountService.assignUser(this.user);
      },
      error => {
        this.logger.log(error);
      }
    );
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.location.back();
  }
}
