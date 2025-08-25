import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
import { CurrencyPipe } from '../../core/pipes/currency.pipe';
import { DayMonthYearPipe } from '../../core/pipes/date.pipe';
import { DurationPipe } from '../../core/pipes/time.pipe';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { MoviesService } from '../../core/services/movies.service';
import { NavigationService } from '../../core/services/navigation.service';
import { environment } from '../../environments/environment';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-movie-details',
  imports: [
    Spinner,
    DayMonthYearPipe,
    DurationPipe,
    CurrencyPipe,
    TruncatePipe,
    RouterLink,
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  movieId!: number;
  movieDetails!: MovieDetailsResponse;
  castsCrews!: CastsCrews;
  images!: Image[];
  videos!: Video[];
  reviews!: ReviewsResponse;
  isInUserFavorite = false;

  constructor(
    private movieService: MoviesService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.movieId = Number(params['movieId']);
      if (!this.movieId) this.navigationSerive.navigateNotFound();

      const observables = [
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
        this.movieService.getMovievideos(this.movieId)
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
          )
      ]

      forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe()
    })
  }

  getFloor(average: number | string): string {
    return Number(average).toFixed(1);
  }

  getSafeUrl(key: string) {
    const videoUrl = `https://www.youtube.com/embed/${key}?si=llfpXf6fDAEayG39`;
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    return safeUrl;
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


}
