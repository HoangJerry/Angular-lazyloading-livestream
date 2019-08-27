import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";
import { WidthService } from "../../core/width.service";

@Component({
  selector: "mcvod-shows",
  templateUrl: "./shows.html"
})
export class ShowsComponent implements OnInit {
  public appName: string;
  public title: string;
  public featuredTVShows: any[];
  public genreTVShows: any[];
  public errorMessage: any[];
  public all: any;

  constructor(
    @Inject(Router) public router: Router,
    public widthService: WidthService,
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {
    this.appName = APP_NAME;
    this.title = "Shows";

    this.route.params.subscribe((params: Params) => {
      if (params["all"]) {
        this.all = params["all"];
      }
    });
  }

  ngOnInit(): void {
    this.getTVShows();
    this.getGenreTVShows();
  }

  showViewAll(numberOfItems: number) {
    if (
      (numberOfItems > 12 && this.widthService.width > 768) ||
      (numberOfItems > 8 &&
        this.widthService.width > 360 &&
        this.widthService.width <= 768) ||
      (numberOfItems > 4 && this.widthService.width <= 360)
    ) {
      return true;
    }

    return false;
  }

  viewAll(all: string) {
    this.router.navigate(["/shows", all]);

    return true;
  }

  /**
   * Go to tv show page
   */
  gotoShow(videoId: string) {
    this.router.navigate(["/tvshow", videoId]);
    return false;
  }

  /**
   * Get list of tv shows
   */
  getTVShows() {
    this.videoService
      .getTVShows()
      .subscribe(
        videos => (this.featuredTVShows = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get list of genre tv shows
   */
  getGenreTVShows() {
    this.videoService.getGenreTVShows().subscribe(
      videos => {
        this.genreTVShows = videos;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
