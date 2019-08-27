import { NgModule }       from '@angular/core';
import { SharedModule }  from '../shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';
// components
import { BrowseComponent } from './browse/browse.component';
import { VideoComponent } from './video/video.component';
import { TVShowComponent } from './tvshow/tvshow.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { KidsComponent } from './kids/kids.component';
import { ChristianLivingComponent } from './christian-living/christian-living.component';
import { TopicComponent } from './topic/topic.component';
import { SearchComponent } from './search/search.component';

// services
import { AuthGuard } from '../core/auth-guard.service';
import { VideoService } from './video.service';
import { ModalModule  } from 'ngx-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    VideoRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BrowseComponent,
    VideoComponent,
    TVShowComponent,
    MoviesComponent,
    ShowsComponent,
    KidsComponent,
    ChristianLivingComponent,
    TopicComponent,
    SearchComponent
  ],
  providers: [
    AuthGuard,
    VideoService
  ]
})

export class VideoModule {}
