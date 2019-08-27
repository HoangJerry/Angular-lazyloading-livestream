import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { HttpClient } from "../core/http-client.service";
import { Logger } from "../core/logger.service";
import { AuthService } from "../core/auth.service";
import { map, catchError, publishReplay, refCount } from "rxjs/operators";

@Injectable()
export class VideoService {
  public model = {};
  private newVideosObs$: any;
  private featuredVideosObs$: any;
  private featuredTVShowsObs$: any;
  private TVShowsObs$: any;
  private kidVideosObs$: any;
  private kidTVShowsObs$: any;
  private topicsObs$ = new ReplaySubject(1);
  private topicTVShowsObs$ = new ReplaySubject(1);
  private popularVideosObs$: any;
  private popularTVShowsObs$: any;
  private genreVideosObs$: any;
  private genreTVShowsObs$: any;
  private popularTopicsObs$: any;
  private newTopicsObs$: any;
  private popularTopicShowsObs$: any;

  private featuredTopicObs$: any;

  constructor(
    private logger: Logger,
    @Inject(Router) public router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get list of new videos
   */
  public getNewVideos(forceRefresh?: boolean) {
    if (!this.newVideosObs$ || forceRefresh) {
      this.newVideosObs$ = this.http.get("/v1/videos/new/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.newVideosObs$;
  }

  /**
   * Get list of featured videos
   */
  public getFeaturedVideos(forceRefresh?: boolean) {
    if (!this.featuredVideosObs$ || forceRefresh) {
      this.featuredVideosObs$ = this.http.get("/v1/videos/featured/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.featuredVideosObs$;
  }

  /**
   * Get list of featured tv shows
   */
  public getFeaturedTVShows(forceRefresh?: boolean) {
    if (!this.featuredTVShowsObs$ || forceRefresh) {
      this.featuredTVShowsObs$ = this.http
        .get("/v1/videos/tvshows/featured/")
        .pipe(
          map((res: any) => res.json()),
          publishReplay(1),
          refCount(),
          catchError(this.http.handleError)
        );
    }
    return this.featuredTVShowsObs$;
  }

  /**
   * Get list of popular videos
   */
  public getPopularVideos(forceRefresh?: boolean) {
    if (!this.popularVideosObs$ || forceRefresh) {
      this.popularVideosObs$ = this.http.get("/v1/videos/popular/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.popularVideosObs$;
  }

  /**
   * Get list of Popular tv shows
   */
  public getPopularTVShows(forceRefresh?: boolean) {
    if (!this.popularTVShowsObs$ || forceRefresh) {
      this.popularTVShowsObs$ = this.http
        .get("/v1/videos/tvshows/popular/")
        .pipe(
          map((res: any) => res.json()),
          publishReplay(1),
          refCount(),
          catchError(this.http.handleError)
        );
    }
    return this.popularTVShowsObs$;
  }

  /**
   * Get list of tv shows
   */
  public getTVShows(forceRefresh?: boolean) {
    if (!this.TVShowsObs$ || forceRefresh) {
      this.TVShowsObs$ = this.http.get("/v1/videos/tvshows/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.TVShowsObs$;
  }

  /**
   * Get list of genre videos
   */
  public getGenreVideos(forceRefresh?: boolean) {
    if (!this.genreVideosObs$ || forceRefresh) {
      this.genreVideosObs$ = this.http.get("/v1/videos/genres/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.genreVideosObs$;
  }

  /**
   * Get list of genre tv shows
   */
  public getGenreTVShows(forceRefresh?: boolean) {
    if (!this.genreTVShowsObs$ || forceRefresh) {
      this.genreTVShowsObs$ = this.http.get("/v1/videos/tvshows/genres/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.genreTVShowsObs$;
  }

  /**
   * Get tv show by ID
   */
  public getTVShowDetail(id: string) {
    return this.http.get("/v1/videos/tvshows/" + id + "/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get tv season by ID
   */
  public getTVSeasonDetail(TVShowID: string, id: string) {
    return this.http
      .get("/v1/videos/tvshows/" + TVShowID + "/" + id + "/")
      .pipe(
        map((res: any) => res.json()),
        catchError(this.http.handleError)
      );
  }

  /**
   * Get movies by ID
   */
  public getVideo(id: string) {
    return this.http.get("/v1/videos/" + id + "/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get video link by ID
   */
  public getVideoLink(id: string) {
    let user_profile = localStorage.getItem("user_profile")
    // user_id needs to be the profile 
    return this.http.get("/v1/videos/" + id + "/" + user_profile + "/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get video key by ID
   */
  public getVideoKey(id: string) {
    return this.http.get("/v1/videos/key/" + id + "/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get list of user recommended videos
   */
  public getRecomendedVideos() {
    let user_profile = localStorage.getItem("user_profile")
    return this.http.get("/v1/users/" + user_profile + "/recomended/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get list of topics
   */
  public getTopics(forceRefresh?: boolean) {
    // if the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.topicsObs$.observers.length || forceRefresh) {
      this.http
        .get("/v1/videos/topics/")
        .pipe(
          map((res: any) => res.json()),
          catchError(this.http.handleError)
        )
        .subscribe(
          (data: any) => this.topicsObs$.next(data),
          (error: any) => {
            this.topicsObs$.error(error);
            // recreate the Observable as after Error we cannot emit data anymore
            this.topicsObs$ = new ReplaySubject(1);
          }
        );
    }

    return this.topicsObs$;
  }

  /**
   * Get list of topic tv shows
   */
  public getTopicShows(forceRefresh?: boolean) {
    // if the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.topicTVShowsObs$.observers.length || forceRefresh) {
      this.http
        .get("/v1/videos/tvshows/topic/")
        .pipe(
          map((res: any) => res.json()),
          catchError(this.http.handleError)
        )
        .subscribe(
          (data: any) => this.topicTVShowsObs$.next(data),
          (error: any) => {
            this.topicTVShowsObs$.error(error);
            // recreate the Observable as after Error we cannot emit data anymore
            this.topicTVShowsObs$ = new ReplaySubject(1);
          }
        );
    }

    return this.topicTVShowsObs$;
  }

  /**
   * Get list of topic videos
   */
  public getTopic(topic: string) {
    return this.http.get("/v1/videos/topics/" + topic + "/").pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get list of kid videos
   */
  public getKidVideos(forceRefresh?: boolean) {
    if (!this.kidVideosObs$ || forceRefresh) {
      this.kidVideosObs$ = this.http.get("/v1/videos/kids/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.kidVideosObs$;
  }

  /**
   * Get list of kid tv shows
   */
  public getKidTVShows(forceRefresh?: boolean) {
    if (!this.kidTVShowsObs$ || forceRefresh) {
      this.kidTVShowsObs$ = this.http.get("/v1/videos/tvshows/kids/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.kidTVShowsObs$;
  }

  /**
   * Save user's history
   */
  public saveHistory(id: string, percentPlayed: string, rating: number) {
    let user_id = this.authService.getLoggedUser();
    return this.http
      .put("/v1/videos/" + id + "/" + user_id + "/", {
        percentPlayed: percentPlayed,
        rating: rating
      })
      .pipe(
        map((res: any) => res.json()),
        catchError(this.http.handleError)
      );
  }

  /**
   * Get list of videos, shows, live streams
   */
  public getSearch(query: string) {
    return this.http.get("/v1/videos/search/?query=" + query).pipe(
      map((res: any) => res.json()),
      catchError(this.http.handleError)
    );
  }

  /**
   * Get video history
   */
  public getVideoHistory(id: string) {
    let user_profile = localStorage.getItem("user_profile")
    return this.http
      .get("/v1/users/" + user_profile + "/videohistory/" + id + "/")
      .pipe(
        map((res: any) => res.json()),
        catchError(this.http.handleError)
      );
  }

  /**
   * Get list of genre tv shows
   */
  public getPopularTopics(forceRefresh?: boolean) {
    if (!this.popularTopicsObs$ || forceRefresh) {
      this.popularTopicsObs$ = this.http.get("/v1/videos/topics/popular/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.popularTopicsObs$;
  }

  /**
   * Get list of genre tv shows
   */
  public getNewTopics(forceRefresh?: boolean) {
    if (!this.newTopicsObs$ || forceRefresh) {
      this.newTopicsObs$ = this.http.get("/v1/videos/topics/new/").pipe(
        map((res: any) => res.json()),
        publishReplay(1),
        refCount(),
        catchError(this.http.handleError)
      );
    }
    return this.newTopicsObs$;
  }

  /**
   * Get list of genre tv shows
   */
  public getPopularTopicShows(forceRefresh?: boolean) {
    if (!this.popularTopicShowsObs$ || forceRefresh) {
      this.popularTopicShowsObs$ = this.http
        .get("/v1/videos/tvshows/topic/popular/")
        .pipe(
          map((res: any) => res.json()),
          publishReplay(1),
          refCount(),
          catchError(this.http.handleError)
        );
    }
    return this.popularTopicShowsObs$;
  }
}
