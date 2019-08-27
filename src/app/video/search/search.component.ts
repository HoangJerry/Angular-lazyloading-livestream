import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";

@Component({
  selector: "mcvod-search",
  templateUrl: "./search.html"
})
export class SearchComponent implements OnInit {
  public appName: string;
  public query: string;
  public videos: any[];
  public tvshows: any[];
  public streams: any[];
  public topics: any[];
  public errorMessage: any[];

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.query = params["query"];
      // get query
      this.handleSearch(this.query);
    });
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
   * Go to topic page
   */
  gotoTopic(topic: string) {
    this.router.navigate(["/topic", topic]);
    return false;
  }

  /**
   * Get list of videos, shows, live streams
   */
  handleSearch(query: string) {
    this.videoService.getSearch(query).subscribe(
      (result: any) => {
        this.videos = result.videos;
        this.tvshows = result.tvshow;
        this.streams = result.livecontent;
        this.topics = result.topic;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }
}
