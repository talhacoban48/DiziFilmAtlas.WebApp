import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ListChip, menuForMovies } from '../../core/data/list-chips';
import { MovieSearchUrlParams } from '../../core/enums/url-params.enum';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { MoviesService } from '../../core/services/movies.service';
import { NavigationService } from '../../core/services/navigation.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralList } from '../../shared/general-list/general-list';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-movies',
  imports: [Spinner, GeneralList, Navbar, Footer],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {

  movies?: GenericResponse<Movie[]>;
  navigateParams: { currentTitle: MovieSearchUrlParams, page: number } = { currentTitle: MovieSearchUrlParams.NowPlaying, page: 1 };
  isLoading: boolean = true;
  menuForMovies: ListChip[] = menuForMovies;

  constructor(
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.navigateParams.currentTitle = params["category"];
      this.navigateParams.page = Number(params["page"]) ?? 1;
      if (!this.navigateParams.page) this.navigateParams.page = 1;

      if (!this.navigateParams.currentTitle || this.navigateParams.currentTitle == MovieSearchUrlParams.NowPlaying) {
        this.navigateParams.currentTitle = MovieSearchUrlParams.NowPlaying;
        this.moviesService.getNowPlayingMovies(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies),
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == MovieSearchUrlParams.Popular) {
        this.navigateParams.currentTitle = MovieSearchUrlParams.Popular;
        this.moviesService.getPopularMovies(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == MovieSearchUrlParams.TopRated) {
        this.navigateParams.currentTitle = MovieSearchUrlParams.TopRated;
        this.moviesService.getTopRatedMovies(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == MovieSearchUrlParams.UpComing) {
        this.navigateParams.currentTitle = MovieSearchUrlParams.UpComing;
        this.moviesService.getUpcomingMovies(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      }
    }
    )
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    if (params.currentTitle != "discover") {
      return this.navigationService.navigateTo(["movies", params.currentTitle, params.page])
    } else {
      return this.navigationService.navigateTo(["movies", params.currentTitle])
    }
  }

}
