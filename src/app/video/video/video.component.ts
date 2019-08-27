declare var videojs: any;
import { Component, Inject, OnInit, OnDestroy, NgZone } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import {
  APP_NAME,
  HISTORY_UPDATE_TIME,
  PLAYING_NEXT_VIDEO_TIME
} from "../../app.constants";
import { VideoService } from "../video.service";
import { AuthService } from "../../core/auth.service";

@Component({
  selector: "mcvod-video",
  templateUrl: "./video.html"
  // styleUrls: ['./video.component.scss'] REMOVEthis
})
export class VideoComponent implements OnInit, OnDestroy {
  public appName: string;
  public recomendedVideos: any[];
  public nextEpisode: any;
  public nextEpisodes: any[];
  public topic: any;
  public errorMessage: any[];
  public videoErrorMessage: any[];
  public video: any;
  public key: any;
  public videoLink: string;
  public started: boolean;
  public player: any;
  public playerID: any;
  public ended: boolean;
  public playInterval: any;
  public currentTime: string;
  public autoPlay: boolean;
  public inTopic: boolean;
  public user: any;

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService,
    private location: Location,
    private route: ActivatedRoute,
    private _zone: NgZone,
    private authService: AuthService
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.started = false;
      this.ended = false;
      this.playerID = new Date().getTime();
      this.nextEpisode = null;
      this.currentTime = null;

      let id = params["id"];
      console.log(params)
      if (params["currentTime"]) {
        this.currentTime = params["currentTime"];
      }
      if (params["play"]) {
        this.autoPlay = params["play"];
      }
      if (params["topic"]) {
        this.inTopic = params["topic"];
      }

      this.authService.getLoggedUserData().subscribe(
        user_profile => {
          this.user = user_profile;

          // get video
          this.videoService.getVideo(id).subscribe(
            video => {
              this.video = video;
              this.getNextPlayingEpisode();
              // get recomended videos
              this.getRecomendedVideos();
            },
            error => {
              this.videoErrorMessage = <any>error;
            }
          );

          // get video link
          this.videoService.getVideoLink(id).subscribe(
            video => {
              this.videoLink = video.videoLink;
              // init player
              this.player = videojs("video-" + this.playerID);
              this.player.src({
                src: this.videoLink,
                type: "application/x-mpegURL"
              });
              // set current time for history
              if (this.currentTime) {
                this.player.currentTime(this.currentTime);
                if (this.autoPlay) {
                  this.start();
                }
              } else {
                // get video history
                this.videoService.getVideoHistory(id).subscribe(
                  currentTime => {
                    this.currentTime = currentTime.percentPlayed;

                    if (this.currentTime) {
                      this.player.currentTime(this.currentTime);
                    }

                    if (this.autoPlay) {
                      this.start();
                    }
                  },
                  error => {
                    this.errorMessage = <any>error;
                  }
                );
              }

              // handle ended
              this.player.on("ended", (result: any) => {
                this._zone.run(() => {
                  this.saveHistory("0");
                  this.ended = true;
                  this.playingNextVideo();
                });
              });
            },
            error => {
              this.videoErrorMessage = <any>error;
            }
          );
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.playInterval) {
      clearInterval(this.playInterval);
    }
  }

  /**
   * Start the video
   */
  start() {
    this.started = true;
    this.ended = false;
    this.player.play();
    this.playInterval = setInterval(() => {
      this.saveHistory(this.player.currentTime());
    }, HISTORY_UPDATE_TIME);
  }

  /**
   * Send a put every 10 seconds to record user's history
   */
  saveHistory(currentTime: string) {
    if (this.started && !this.ended) {
      this.videoService
        .saveHistory(this.video.videoID, currentTime, 1)
        .subscribe();
    }
  }

  /**
   * Go to another video page
   */
  gotoVideo(videoId: string, play?: boolean) {
    if (play) {
      if (this.inTopic && this.video.topic_type) {
        this.router.navigate(["/video", videoId, { play: true, topic: true }]);
      } else {
        this.router.navigate(["/video", videoId, { play: true }]);
      }
    } else {
      this.router.navigate(["/video", videoId]);
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
   * Go back unplay
   */
  unPlay(): void {
    this.player.pause();
    this.started = false;
  }

  /**
   * Get list of user recommended videos
   */
  getRecomendedVideos() {
    this.videoService.getRecomendedVideos().subscribe(
      videos => {
        this.recomendedVideos = videos;
        this.getNextPlayingEpisode();
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  /**
   * Close video error popup
   */
  closeVideoErrorMessage() {
    this.videoErrorMessage = null;
  }

  /**
   * Get next playing video
   */
  getNextPlayingEpisode() {
    if (this.inTopic && this.video.topic_type) {
      this.videoService.getTopic(this.video.topic_type.id).subscribe(
        topic => {
          this.topic = topic;
          if (this.topic.episodes.length > 0) {
            // next playing
            for (let i = 0; i < this.topic.episodes.length; i++) {
              if (this.topic.episodes[i].videoID === this.video.videoID) {
                if (
                  i === this.topic.episodes.length - 1 &&
                  this.topic.episodes.length > 1
                ) {
                  this.nextEpisode = this.topic.episodes[0];
                } else {
                  this.nextEpisode = this.topic.episodes[i + 1];
                  this.topic.episodes.splice(i + 1, 1);
                  this.topic.episodes.unshift(this.nextEpisode);
                }
                break;
              }
            }

            if (this.nextEpisode) {
              this.videoService.getVideo(this.nextEpisode.videoID).subscribe(
                episode => {
                  this.nextEpisode = episode;
                },
                error => {
                  this.videoErrorMessage = <any>error;
                }
              );
            }
          }
        },
        error => (this.errorMessage = <any>error)
      );
    } else {
      // get next episodes from tv show
      if (this.video.tvShow) {
        this.videoService
          .getTVSeasonDetail(
            this.video.tvShow.TvShowID,
            this.video.season.seasonID
          )
          .subscribe(
            episodes => {
              this.nextEpisodes = episodes;
              // next playing
              for (let i = 0; i < this.nextEpisodes.length; i++) {
                if (
                  this.nextEpisodes[i].episodeNumber >=
                  this.video.episodeNumber + 1
                ) {
                  this.nextEpisode = this.nextEpisodes[i];
                  this.nextEpisodes.splice(i, 1);
                  this.nextEpisodes.unshift(this.nextEpisode);
                  break;
                }
              }
              if (this.nextEpisode) {
                this.videoService.getVideo(this.nextEpisode.videoID).subscribe(
                  episode => {
                    this.nextEpisode = episode;
                  },
                  error => {
                    this.videoErrorMessage = <any>error;
                  }
                );
              }
            },
            error => {
              this.errorMessage = <any>error;
            }
          );
      } else {
        // get next recommended video
        if (this.recomendedVideos) {
          // next playing
          for (let i = 0; i < this.recomendedVideos.length; i++) {
            if (
              this.recomendedVideos[i].videoList.videoID !== this.video.videoID
            ) {
              let temp = this.recomendedVideos[i];
              this.nextEpisode = this.recomendedVideos[i].videoList;
              this.recomendedVideos.splice(i, 1);
              this.recomendedVideos.unshift(temp);
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Auto playing next video after video finished
   */
  playingNextVideo() {
    setTimeout(() => {
      if (this.nextEpisode && this.ended && this.started) {
        this.gotoVideo(this.nextEpisode.videoID, true);
      }
    }, PLAYING_NEXT_VIDEO_TIME);
  }
}
