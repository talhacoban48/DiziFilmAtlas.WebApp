import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { Provider } from '../../core/interfaces/providers.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { TvShowDetailsResponse } from '../../core/interfaces/tvshow-details.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
import { NavigationService } from '../../core/services/navigation.service';
import { TvShowsService } from '../../core/services/tvshows.service';
import { environment } from '../../environments/environment';
import { GeneralDetails } from '../../shared/general-details/general-details';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-tvshow-details',
  imports: [
    Spinner,
    GeneralDetails
  ],
  templateUrl: './tvshow-details.html',
  styleUrl: './tvshow-details.scss'
})
export class TvshowDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  tvShowId!: number;
  tvShowDetails!: TvShowDetailsResponse;
  castsCrews!: CastsCrews;
  images!: Image[];
  videos!: Video[];
  reviews!: ReviewsResponse;
  similarTvShows!: GenericResponse<TvShow[]>;
  providers!: Provider[];
  similarTvShowsPage: number = 1;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    private tvShowService: TvShowsService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.tvShowId = Number(params['tvShowId']);
      if (!this.tvShowId) this.navigationSerive.navigateNotFound();

      const observables = [
        this.tvShowService.getTvShowDetails(this.tvShowId)
          .pipe(
            map(tvShowDetails => {
              this.tvShowDetails = tvShowDetails;
              console.log(tvShowDetails)
            })
          ),
        this.tvShowService.getTvShowCasts(this.tvShowId)
          .pipe(
            map(casts => {
              this.castsCrews = casts;
              console.log("casts", this.castsCrews);
            })
          ),
        this.tvShowService.getTvShowImages(this.tvShowId)
          .pipe(
            map(images => {
              this.images = images;
              console.log("images", images);
            })
          ),
        this.tvShowService.getTvShowvideos(this.tvShowId)
          .pipe(
            map(videos => {
              if (videos.length > 3) videos = videos.slice(0, 3);
              this.videos = videos;
              console.log("videos", videos);
            })
          ),
        this.tvShowService.getTvShowReviews(this.tvShowId, 1)
          .pipe(
            map(reviews => {
              this.reviews = reviews;
              console.log("reviews", reviews);
            })
          ),
        this.tvShowService.getProviders(this.tvShowId)
          .pipe(
            map(providers => {
              this.providers = providers;
              console.log("providers", providers);
            })
          ),
      ];

      observables.push(this.getSimilarTvShows(this.similarTvShowsPage));
      forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe()

    })
  }

  getSimilarTvShowsByPage(page: number) {
    this.similarTvShowsPage = page;
    this.getSimilarTvShows(page).subscribe();
  }

  getSimilarTvShows(page: any) {
    return this.tvShowService.getSimilarTvShows(this.tvShowId, page)
      .pipe(
        map(tvShows => {
          console.log(tvShows)
          this.similarTvShows = tvShows;
        })
      );
  }
}
