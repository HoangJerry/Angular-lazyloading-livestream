import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";
import { WidthService } from "../../core/width.service";

@Component({
  selector: "mcvod-movies",
  templateUrl: "./movies.html"
})
export class MoviesComponent implements OnInit {
  public appName: string;
  public title: string;
  public newVideos: any[];
  public featuredVideos: any[];
  public genreVideos: any[];
  public errorMessage: any[];
  public all: any;

  constructor(
    @Inject(Router) public router: Router,
    public widthService: WidthService,
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {
    this.appName = APP_NAME;
    this.title = "Movies";

    this.route.params.subscribe((params: Params) => {
      if (params["all"]) {
        this.all = params["all"];
      }
    });
  }

  ngOnInit(): void {
    this.getNewVideos();
    this.getFeaturedVideos();
    this.getGenreVideos();
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
    this.router.navigate(["/movies", all]);

    return true;
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
   * Get list of new videos
   */
  getNewVideos() {
    this.videoService
      .getNewVideos()
      .subscribe(
        videos => (this.newVideos = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get list of featured videos
   */
  getFeaturedVideos() {
    this.videoService
      .getFeaturedVideos()
      .subscribe(
        videos => (this.featuredVideos = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get list of genre videos
   */
  getGenreVideos() {
    this.videoService.getGenreVideos().subscribe(
      videos => {
        this.genreVideos = videos;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
