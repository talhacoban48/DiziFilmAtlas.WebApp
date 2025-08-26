import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { CastDetailResponse } from '../../core/interfaces/cast-details.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { Provider } from '../../core/interfaces/providers.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { TvShowDetailsResponse } from '../../core/interfaces/tvshow-details.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
import { CalculateAgePipe } from '../../core/pipes/calculate-age.pipe';
import { DayMonthYearPipe } from '../../core/pipes/date.pipe';
import { DurationPipe } from '../../core/pipes/time.pipe';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { HelperService } from '../../core/services/helper.service';
import { environment } from '../../environments/environment';
import { GeneralList } from '../general-list/general-list';

@Component({
  selector: 'app-general-details',
  imports: [
    RouterLink,
    DayMonthYearPipe,
    DurationPipe,
    CurrencyPipe,
    TruncatePipe,
    CalculateAgePipe,
    GeneralList,
  ],
  templateUrl: './general-details.html',
  styleUrl: './general-details.scss'
})
export class GeneralDetails implements OnInit {

  basePath: string = environment.basePath;
  imageUrl: string = environment.cdnUrl;

  @Input() generalId!: number;
  @Input() generalDetails!: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse;
  @Input() castsCrews?: CastsCrews;
  @Input() images!: Image[];
  @Input() videos?: Video[];
  @Input() reviews?: ReviewsResponse;
  @Input() similarGenerals?: GenericResponse<TvShow[] | Movie[]>;
  @Input() providers?: Provider[];
  @Input() castMovies?: GenericResponse<Movie[]>;
  @Input() crewMovies?: GenericResponse<Movie[]>;
  @Input() castTvShows?: GenericResponse<TvShow[]>;
  @Input() crewTvShows?: GenericResponse<TvShow[]>;
  pagedGenerals?: GenericResponse<Movie[] | TvShow[]>;
  @Output() similarGeneralsPageOutput = new EventEmitter();
  totalItemsPerPage: number = 10;

  similarGeneralsPage: number = 1;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    protected helperService: HelperService,
  ) {

  }


  ngOnInit(): void {
    if (this.castMovies) {
      this.pagedGenerals = this.getPagedGenerals(this.castMovies);
    }
  }

  addFavorite(id: number) {

  }

  RemoveFavorite(id: number) {

  }

  toCastLeft() {
    const cast = this.castsCrews?.casts.shift();
    if (cast) {
      this.castsCrews?.casts.push(cast);
    }
  }

  toCastRight() {
    const cast = this.castsCrews?.casts.pop();
    if (cast) {
      this.castsCrews?.casts.unshift(cast);
    }
  }

  toCrewLeft() {
    const crew = this.castsCrews?.crews.shift();
    if (crew) {
      this.castsCrews?.crews.push(crew);
    }
  }

  toCrewRight() {
    const crew = this.castsCrews?.crews.pop();
    if (crew) {
      this.castsCrews?.crews.unshift(crew);
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

  isMovie(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse): item is MovieDetailsResponse {
    return (item as MovieDetailsResponse).title !== undefined;
  }

  isTvShow(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse): item is TvShowDetailsResponse {
    return (item as TvShowDetailsResponse).name !== undefined && (item as TvShowDetailsResponse).first_air_date !== undefined;
  }

  isCast(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse): item is CastDetailResponse {
    return (item as CastDetailResponse).gender !== undefined;
  }

  getPreviousSimilarGenerals() {
    if (this.similarGeneralsPage > 1) {
      this.similarGeneralsPage = this.similarGeneralsPage - 1;
      this.getSimilarGeneralsByPage(this.similarGeneralsPage);
    }
  }

  getSimilarGeneralsByPage(page: number) {
    this.similarGeneralsPage = page;
    this.similarGeneralsPageOutput.emit(this.similarGeneralsPage);
  }

  getNextSimilarTvShows() {
    if (this.similarGeneralsPage < 500) {
      this.similarGeneralsPage = this.similarGeneralsPage + 1;
      this.getSimilarGeneralsByPage(this.similarGeneralsPage);
    }
  }

  getPagedGenerals(data: GenericResponse<Movie[] | TvShow[]>) {
    return {
      page: data.page,
      results: data.results.slice((data.page - 1) * this.totalItemsPerPage, (data.page - 1) * this.totalItemsPerPage + this.totalItemsPerPage),
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  }

  getPreviousCastMovies() {
    if (this.castMovies!.page > 1) {
      this.castMovies!.page = this.castMovies!.page - 1;
      this.pagedGenerals = this.getPagedGenerals(this.castMovies!);
    }
  }

  getSimilarCastMoviesByPage(page: number) {
    this.castMovies!.page = page;
    this.pagedGenerals = this.getPagedGenerals(this.castMovies!);
    console.log("this.pagedGenerals", this.pagedGenerals, this.castMovies)
  }

  getNextCastMoviesTvShows() {
    if (this.castMovies!.page < this.castMovies!.total_results) {
      this.castMovies!.page = this.castMovies!.page + 1;
      this.pagedGenerals = this.getPagedGenerals(this.castMovies!);

    }
  }
}
