import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { LoadingService } from "./loading.service";

@Component({
  selector: "mcvod-spinner",
  templateUrl: "./spinner.html"
})
export class SpinnerComponent {
  public loading: boolean;
  public _subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loading = loadingService.isLoading;
    this._subscription = loadingService.loadingAnnounced$.subscribe(
      (value: boolean) => {
        this.loading = value;
      }
    );
  }
}
