import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";

@Component({
  selector: "mcvod-kids",
  templateUrl: "./kids.html"
})
export class KidsComponent implements OnInit {
  public appName: string;
  public title: string;
  public kidVideos: any[];
  public kidTVShows: any[];
  public errorMessage: any[];

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService
  ) {
    this.appName = APP_NAME;
    this.title = "Kids";
  }

  ngOnInit(): void {
    this.getKidVideos();
    this.getKidTVShows();
  }

  /**
   * Go to video page
   */
  gotoVideo(videoId: string) {
    this.router.navigate(["/video", videoId]);
    return false;
  }

  /**
   * Go to tv show page
   */
  gotoShow(videoId: string) {
    this.router.navigate(["/tvshow", videoId]);
    return false;
  }

  /**
   * Get list of kid videos
   */
  getKidVideos() {
    this.videoService
      .getKidVideos()
      .subscribe(
        videos => (this.kidVideos = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get list of kid tv shows
   */
  getKidTVShows() {
    this.videoService
      .getKidTVShows()
      .subscribe(
        videos => (this.kidTVShows = videos),
        error => (this.errorMessage = <any>error)
      );
  }
}
