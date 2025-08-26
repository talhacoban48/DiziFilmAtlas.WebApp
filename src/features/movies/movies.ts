import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { MovieSearchUrlParams } from '../../core/enums/url-params.enum';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { MoviesService } from '../../core/services/movies.service';
import { environment } from '../../environments/environment';
import { GeneralList } from '../../shared/general-list/general-list';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-movies',
  imports: [Spinner, GeneralList],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {

  imageUrl = environment.cdnUrl;
  movies!: GenericResponse<Movie[]>;
  currentTitle: MovieSearchUrlParams = MovieSearchUrlParams.NowPlaying;
  page: number = 1;
  isLoading: boolean = true;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.currentTitle = params["category"];
      this.page = Number(params["page"]) ?? 1;
      if (!this.page) this.page = 1;

      if (!this.currentTitle || this.currentTitle == MovieSearchUrlParams.NowPlaying) {
        this.currentTitle = MovieSearchUrlParams.NowPlaying;
        this.moviesService.getNowPlayingMovies(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      } else if (this.currentTitle == MovieSearchUrlParams.Popular) {
        this.currentTitle = MovieSearchUrlParams.Popular;
        this.moviesService.getPopularMovies(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      } else if (this.currentTitle == MovieSearchUrlParams.TopRated) {
        this.currentTitle = MovieSearchUrlParams.TopRated;
        this.moviesService.getTopRatedMovies(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      } else if (this.currentTitle == MovieSearchUrlParams.UpComing) {
        this.currentTitle = MovieSearchUrlParams.UpComing;
        this.moviesService.getUpcomingMovies(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(movies => this.movies = movies)
          )
          .subscribe();
      }
    })
  }

}
