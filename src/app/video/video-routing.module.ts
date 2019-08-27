import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../core/auth-guard.service";
import { BrowseComponent } from "./browse/browse.component";
import { VideoComponent } from "./video/video.component";
import { TVShowComponent } from "./tvshow/tvshow.component";
import { MoviesComponent } from "./movies/movies.component";
import { ShowsComponent } from "./shows/shows.component";
import { KidsComponent } from "./kids/kids.component";
import { ChristianLivingComponent } from "./christian-living/christian-living.component";
import { TopicComponent } from "./topic/topic.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "browse",
        component: BrowseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "browse/:uid/:token",
        component: BrowseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "browse/:all",
        component: BrowseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "video/:id",
        component: VideoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "video/:id/:currentTime",
        component: VideoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "tvshow/:id",
        component: TVShowComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "movies",
        component: MoviesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "movies/:all",
        component: MoviesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "shows",
        component: ShowsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "shows/:all",
        component: ShowsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "kids",
        component: KidsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "christian-living",
        component: ChristianLivingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "topic/:topic",
        component: TopicComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "search/:query",
        component: SearchComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class VideoRoutingModule {}
