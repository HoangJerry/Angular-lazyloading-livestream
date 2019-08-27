import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_NAME, LOGO_COLOR } from '../../app.constants';
import { VideoService } from '../video.service';

@Component({
  selector: 'mcvod-christian-living',
  templateUrl: './christian-living.html'
})
export class ChristianLivingComponent implements OnInit {
	public appName: string;
  public title: string;
  public topics: any;
  public shows: any;
  public errorMessage: any[];
  public topicView: boolean;
  public showView: boolean;
	public filtered: boolean;
  public slides: any[];
  public popularTopics: any[];
  public newTopics: any[];
  public popularTopicShows: any[];

  constructor(@Inject(Router) public router: Router, private videoService: VideoService) {
    this.appName = APP_NAME;
    this.title = 'Christian Living';
    this.topicView = false;
    this.showView = false;
    this.filtered = false;
    this.slides = [];
  }

  ngOnInit(): void {
    this.getTopics();
    this.getPopularTopics();
    this.getNewTopics();
    this.getTopicShows();
    this.getPopularTopicShows();
  }

  /**
   * Go to video page
   */
  gotoVideo(videoId: string) {
    this.router.navigate(['/video', videoId]);
    return false;
  }

  /**
   * Go to topic page
   */
  gotoTopic(topic: string) {
    this.router.navigate(['/topic', topic]);
    return false;
  }

  /**
   * Go to tv show page
   */
  gotoShow(videoId: string) {
    this.router.navigate(['/tvshow', videoId]);
    return false;
  }

  /**
   * Get list of topics
   */
  getTopics() {
    this.videoService.getTopics()
                     .subscribe(
                       (videos: any[]) => {
                        this.topics = videos;
                       },
                       error =>  this.errorMessage = <any>error);
  }

  /**
   * Get list of topic tv shows (tv show has topic )
   */
  getTopicShows() {
    this.videoService.getTopicShows()
                     .subscribe(
                       shows => {
                         this.shows = shows;
                       },
                       error =>  this.errorMessage = <any>error);
  }

  /**
   * Get list popular topics
   */
  getPopularTopics() {
    this.videoService.getPopularTopics()
                     .subscribe(
                       topics => {
                         this.popularTopics = topics;

                       },
                       error =>  this.errorMessage = <any>error);
  }

  /**
   * Get list new topics (tv show has topic )
   */
  getNewTopics() {
    this.videoService.getNewTopics()
                     .subscribe(
                       topics => {
                         this.newTopics = topics;
                         for (let i = 0; i < topics.length; ++i) {
                          if (i==6) break;
                            this.slides.push({
                              'img': topics[i].featureImageLink,
                              'title': topics[i].title,
                              'index': i,
                              'active': i == 0 ? true : false,
                              'videoID': topics[i].id
                             });
                          }
                       },
                       error =>  this.errorMessage = <any>error);
  }

  /**
   * Get list of popular topic tv shows (tv show has topic )
   */
  getPopularTopicShows() {
    this.videoService.getPopularTopicShows()
                     .subscribe(
                       shows => {
                         this.popularTopicShows = shows;
                       },
                       error =>  this.errorMessage = <any>error);
  }

  /**
   * View topics
   */
  viewTopics() {
    this.topicView = true;
    this.showView = false;
    this.filtered = true;
  }

  /**
   * View shows
   */
  viewShows() {
    this.showView = true;
    this.topicView = false;
    this.filtered = true;
  }
}
