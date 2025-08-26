import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { finalize, forkJoin, tap } from 'rxjs';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { MoviesService } from '../../core/services/movies.service';
import { TvShowsService } from '../../core/services/tvshows.service';
import { environment } from '../../environments/environment';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-home',
  imports: [Spinner, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'

})
export class Home {

  isLoading: boolean = true;
  imageUrl: string = environment.cdnUrl;
  trendingMoviesCurrentIndex: number = 20;
  popularMoviesCurrentIndex: number = 20;
  trendingTvshowsCurrentIndex: number = 20;
  popularTvshowsCurrentIndex: number = 20;
  trendingMovies?: GenericResponse<Movie[]> = undefined;
  popularMovies?: GenericResponse<Movie[]> = undefined;
  trendingTvshows?: GenericResponse<TvShow[]> = undefined;
  popularTvshows?: GenericResponse<TvShow[]> = undefined;

  constructor(
    private movieService: MoviesService,
    private tvShowService: TvShowsService,
  ) {

    const observables = [
      this.movieService.getTrendingMovies()
        .pipe(
          tap(res => {
            this.trendingMovies = res;
            this.trendingMoviesCurrentIndex = res.results.length;
          }),
        ),
      this.tvShowService.getTrendingTvShows()
        .pipe(
          tap(res => {
            this.trendingTvshows = res;
            this.trendingTvshowsCurrentIndex = res.results.length;
          }),
        ),
      this.movieService.getPopularMovies(1)
        .pipe(
          tap(res => {
            this.popularMovies = res;
            this.popularMoviesCurrentIndex = res.results.length;
          }),
        ),
      this.tvShowService.getPopularTvShows(1)
        .pipe(
          tap(res => {
            res.results = res.results.slice(0, 18)
            this.popularTvshows = res;
            this.popularTvshowsCurrentIndex = res.results.length;
          }),
        ),
    ]
    forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe();

  }


  // trending movies
  getPreviousTrendingMovies() {
    if (this.trendingMoviesCurrentIndex != 1) {
      this.trendingMoviesCurrentIndex--;
    }
  }

  getNextTrendingMovies() {
    if (this.trendingMoviesCurrentIndex != this.trendingMovies?.results.length) {
      this.trendingMoviesCurrentIndex++;
    }
  }

  // popular movies
  getPreviousPopularMovies() {
    if (this.popularMoviesCurrentIndex != 1) {
      this.popularMoviesCurrentIndex--;
    }
  }

  getNextPopularMovies() {
    if (this.popularMoviesCurrentIndex != this.popularMovies?.results.length) {
      this.popularMoviesCurrentIndex++;
    }
  }

  // trending tvshows
  getPreviousTrendingTvshow() {
    if (this.trendingTvshowsCurrentIndex != 1) {
      this.trendingTvshowsCurrentIndex--;
    }
  }

  getNextTrendingTvshow() {
    if (this.trendingTvshowsCurrentIndex != this.trendingTvshows?.results.length) {
      this.trendingTvshowsCurrentIndex++;
    }
  }

  // popular tvshows
  getPreviousPopularTvshow() {
    if (this.popularTvshowsCurrentIndex != 1) {
      this.popularTvshowsCurrentIndex--;
    }
  }

  getNextPopularTvshow() {
    if (this.popularTvshowsCurrentIndex != this.popularTvshows?.results.length) {
      this.popularTvshowsCurrentIndex++;
    }
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }
}
