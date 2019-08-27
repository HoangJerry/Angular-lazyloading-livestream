import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { APP_NAME } from "../../app.constants";
import { VideoService } from "../video.service";

@Component({
  selector: "mcvod-topic",
  templateUrl: "./topic.html"
})
export class TopicComponent implements OnInit {
  public appName: string;
  public title: string;
  public topic: any;
  public errorMessage: any[];

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.appName = APP_NAME;
    this.title = "Christian Living";
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let topic = params["topic"];
      // get topic videos
      this.getTopic(topic);
    });
  }

  /**
   * Go to video page
   */
  gotoVideo(videoId: string) {
    this.router.navigate(["/video", videoId, { topic: true }]);
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
   * Play all topic videos
   */
  playAll() {
    if (this.topic.episodes.length > 0) {
      this.router.navigate([
        "/video",
        this.topic.episodes[0].videoID,
        { play: true, topic: true }
      ]);
    }
    return false;
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Get list of topic videos
   */
  getTopic(topic: string) {
    this.videoService.getTopic(topic).subscribe(
      topic => {
        this.topic = topic;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
