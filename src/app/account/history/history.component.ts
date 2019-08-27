import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { HistoryService } from "./history.service";

@Component({
  selector: "mcvod-history",
  templateUrl: "./history.html"
})
export class HistoryComponent implements OnInit {
  public appName: string;
  public videos: any;
  public errorMessage: any;

  constructor(
    private location: Location,
    private historyService: HistoryService,
    @Inject(Router) public router: Router
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.getViewingHistory();
  }

  /**
   * Go to video
   */
  gotoVideo(video: any) {
    this.router.navigate([
      "/video",
      video.videoID.videoID,
      Math.round(video.percentPlayed)
    ]);
    return false;
  }

  /**
   * Get viewing history
   */
  getViewingHistory() {
    this.historyService
      .getViewingHistory()
      .subscribe(
        result => (this.videos = result),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Delete viewing history
   */
  deleteHistory(history: any) {
    this.historyService.deleteHistory(history.id).subscribe(
      success => {
        let index = this.videos.indexOf(history);
        this.videos.splice(index, 1);
      },
      error => {
        console.log(error);
        this.errorMessage = <any>error;
      }
    );
  }
}
