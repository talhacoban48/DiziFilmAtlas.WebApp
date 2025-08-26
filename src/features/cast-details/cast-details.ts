import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { CastDetailResponse } from '../../core/interfaces/cast-details.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { CastService } from '../../core/services/casts.service';
import { NavigationService } from '../../core/services/navigation.service';
import { environment } from '../../environments/environment';
import { GeneralDetails } from '../../shared/general-details/general-details';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-cast-details',
  imports: [Spinner, GeneralDetails],
  templateUrl: './cast-details.html',
  styleUrl: './cast-details.scss'
})
export class CastDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  castId!: number;
  castDetails!: CastDetailResponse;
  images!: Image[];
  castMovies: GenericResponse<Movie[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  };
  crewMovies: GenericResponse<Movie[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  };
  castTvShows: GenericResponse<TvShow[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  };
  crewTvShows: GenericResponse<TvShow[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  };
  totalItemsPerPage: number = 10;

  constructor(
    private castService: CastService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.castId = Number(params['castId']);
      if (!this.castId) this.navigationSerive.navigateNotFound();

      this.castService.getCastDetails(this.castId)
        .pipe(
          finalize(() => this.isLoading = false),
          map(res => {
            console.log(res)
            this.castDetails = res.details;
            this.images = res.images.profiles;

            if (res.movies && res.movies.cast) {
              this.castMovies.total_pages = Math.ceil(res.movies.cast.length / this.totalItemsPerPage) + 1;
              this.castMovies.total_results = res.movies.cast.length;
              this.castMovies.results = res.movies.cast;
            } if (res.movies && res.movies.crew) {
              this.crewMovies.total_pages = Math.ceil(res.movies.crew.length / this.totalItemsPerPage) + 1;
              this.crewMovies.total_results = res.movies.crew.length;
              this.crewMovies.results = res.movies.crew;
            } if (res.tvShows && res.tvShows.cast) {
              this.castTvShows.total_pages = Math.ceil(res.tvShows.cast.length / this.totalItemsPerPage) + 1;
              this.castTvShows.total_results = res.tvShows.cast.length;
              this.castTvShows.results = res.tvShows.cast;
            } if (res.tvShows && res.tvShows.crew) {
              this.crewTvShows.total_pages = Math.ceil(res.tvShows.crew.length / this.totalItemsPerPage) + 1;
              this.crewTvShows.total_results = res.tvShows.crew.length;
              this.crewTvShows.results = res.tvShows.crew;
            }
          })
        )
        .subscribe();
    })
  }

}
