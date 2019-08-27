declare var videojs: any;
import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";

@Component({
  selector: "mcvod-tvshow",
  templateUrl: "./tvshow.html"
})
export class TVShowComponent implements OnInit {
  public appName: string;
  public recomendedVideos: any[];
  public errorMessage: any[];
  public tvShow: any;
  public selectedSeason: string;
  public episodes: any[];

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params["id"];
      // get video
      this.videoService.getTVShowDetail(id).subscribe(
        tvShow => {
          this.tvShow = tvShow;
          if (this.tvShow.seasons.length > 0) {
            this.selectedSeason = this.tvShow.seasons[0].seasonID;
            this.videoService
              .getTVSeasonDetail(id, this.selectedSeason)
              .subscribe(
                episodes => {
                  this.episodes = episodes;
                },
                error => {
                  this.errorMessage = <any>error;
                }
              );
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    });
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Select season
   */
  onSeasonChange(value: string): void {
    this.selectedSeason = value;
    this.videoService
      .getTVSeasonDetail(this.tvShow.TvShowID, this.selectedSeason)
      .subscribe(
        episodes => {
          this.episodes = episodes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  /**
   * Go to video page
   */
  gotoVideo(videoId: string) {
    this.router.navigate(["/video", videoId]);
    return false;
  }
}
