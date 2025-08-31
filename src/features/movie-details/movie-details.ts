import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { CollectionDetailsResponse, MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { Provider } from '../../core/interfaces/providers.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
import { HelperService } from '../../core/services/helper.service';
import { MoviesService } from '../../core/services/movies.service';
import { NavigationService } from '../../core/services/navigation.service';
import { GeneralDetails } from '../../shared/general-details/general-details';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-movie-details',
  imports: [
    Spinner,
    GeneralDetails
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {

  isLoading: boolean = false;
  movieId!: number;
  movieDetails!: MovieDetailsResponse;
  castsCrews!: CastsCrews;
  images!: Image[];
  videos!: Video[];
  reviews!: ReviewsResponse;
  similarMovies!: GenericResponse<Movie[]>;
  providers!: Provider[];
  collection?: CollectionDetailsResponse;
  similarMoviesPage: number = 1;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    private movieService: MoviesService,
    private navigationSerive: NavigationService,
    protected helperService: HelperService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.movieId = Number(params['movieId']);
      if (!this.movieId) this.navigationSerive.navigateNotFound();

      let observables = [
        this.movieService.getMovieDetails(this.movieId)
          .pipe(
            map(res => {
              console.log(res)
              this.movieDetails = res;
            }),
          ),
        this.movieService.getMovieCasts(this.movieId)
          .pipe(
            map(casts => {
              this.castsCrews = casts;
              // console.log("casts", this.castsCrews);
            })
          ),
        this.movieService.getMovieImages(this.movieId)
          .pipe(
            map(images => {
              this.images = images;
              // console.log("images", images);
            })
          ),
        this.movieService.getMovieVideos(this.movieId)
          .pipe(
            map(videos => {
              if (videos.length > 3) videos = videos.slice(0, 3);
              this.videos = videos;
              // console.log("videos", videos);
            })
          ),
        this.movieService.getMovieReviews(this.movieId, 1)
          .pipe(
            map(reviews => {
              this.reviews = reviews;
              // console.log("reviews", reviews);
            })
          ),
        this.movieService.getProviders(this.movieId)
          .pipe(
            map(providers => {
              this.providers = providers;
              // console.log("providers", providers);
            })
          ),
      ];
      observables.push(this.getSimilarMovies(this.similarMoviesPage));
      forkJoin(observables)
        .pipe(
          finalize(() => {
            if (this.movieDetails?.belongs_to_collection && this.movieDetails?.belongs_to_collection.id) {
              this.movieService.getCollectionDetails(this.movieDetails.belongs_to_collection.id)
                .pipe(
                  map(collection => {
                    this.collection = collection;
                    // console.log("collection", collection)
                    this.isLoading = false;
                  })
                )
                .subscribe()
            } else {
              this.isLoading = false;
            }
          })
        )
        .subscribe()
    })
  }

  addFavorite(id: number) {

  }

  RemoveFavorite(id: number) {

  }

  toCastLeft() {
    const cast = this.castsCrews.casts.shift();
    if (cast) {
      this.castsCrews.casts.push(cast);
    }
  }

  toCastRight() {
    const cast = this.castsCrews.casts.pop();
    if (cast) {
      this.castsCrews.casts.unshift(cast);
    }
  }

  toImageLeft() {
    const image = this.images.shift();
    if (image) {
      this.images.push(image);
    }
  }

  toImageRight() {
    const image = this.images.pop();
    if (image) {
      this.images.unshift(image);
    }
  }

  readAllToggle(id: string) {
    if (this.openedReviewIds.includes(id)) {
      this.openedReviewIds = this.openedReviewIds.filter(reviewId => reviewId != id);
    } else {
      this.openedReviewIds.push(id);
    }
  }

  getSimilarMoviesByPage(page: number) {
    this.similarMoviesPage = page;
    this.getSimilarMovies(page).subscribe();
  }

  private getSimilarMovies(page: number) {
    return this.movieService.getSimilarMovies(this.movieId, page)
      .pipe(
        map(movies => {
          this.similarMovies = movies;
        })
      );
  }


}
