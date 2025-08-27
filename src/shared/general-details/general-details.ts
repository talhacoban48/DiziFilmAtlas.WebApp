import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackdropSizes, LogoSizes, PosterSizes, ProfileSizes } from '../../core/enums/image-size';
import { CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { CastDetailResponse } from '../../core/interfaces/cast-details.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { CollectionDetailsResponse, MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
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
  backdropSize = BackdropSizes.w300;
  backdropSizeTarget = BackdropSizes.w1280;
  posterSize = PosterSizes.w500;
  logoSize = LogoSizes.w45;
  avatarSize = ProfileSizes.w45;

  @Input() generalId!: number;
  @Input() generalDetails!: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse;
  @Input() castsCrews?: CastsCrews;
  @Input() images!: Image[];
  @Input() videos?: Video[];
  @Input() reviews?: ReviewsResponse;
  @Input() similarGenerals?: GenericResponse<TvShow[] | Movie[]>;
  @Input() providers?: Provider[];
  @Input() collection?: CollectionDetailsResponse;
  @Input() castMovies?: GenericResponse<Movie[]>;
  @Input() crewMovies?: GenericResponse<Movie[]>;
  @Input() castTvShows?: GenericResponse<TvShow[]>;
  @Input() crewTvShows?: GenericResponse<TvShow[]>;
  @Output() currentPageOutput = new EventEmitter();
  castMoviesPaged?: GenericResponse<Movie[] | TvShow[]>;
  crewMoviesPaged?: GenericResponse<Movie[] | TvShow[]>;
  castTvShowsPaged?: GenericResponse<Movie[] | TvShow[]>;
  crewTvShowsPaged?: GenericResponse<Movie[] | TvShow[]>;

  totalItemsPerPage: number = 10;
  currentPage: number = 1;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    protected helperService: HelperService,
  ) { }


  ngOnInit(): void {
    if (this.castMovies) {
      this.castMoviesPaged = (this.getPagedGeneral(this.castMovies) as GenericResponse<TvShow[]>);
    }
    if (this.crewMovies) {
      this.crewMoviesPaged = (this.getPagedGeneral(this.crewMovies) as GenericResponse<TvShow[]>);
    }
    if (this.castTvShows) {
      this.castTvShowsPaged = (this.getPagedGeneral(this.castTvShows) as GenericResponse<TvShow[]>);
    }
    if (this.crewTvShows) {
      this.crewTvShowsPaged = (this.getPagedGeneral(this.crewTvShows) as GenericResponse<TvShow[]>);
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

  getSimilarGeneralsByPage(page: number) {
    this.currentPage = page;
    this.currentPageOutput.emit(this.currentPage);
  }


  getCastMoviesByPage(page: number) {
    this.castMovies!.page = page;
    this.castMoviesPaged = this.getPagedGeneral(this.castMovies!);
  }

  getCrewMoviesByPage(page: number) {
    this.crewMovies!.page = page;
    this.crewMoviesPaged = this.getPagedGeneral(this.crewMovies!);
  }

  getCastTvShowsByPage(page: number) {
    this.castTvShows!.page = page;
    this.castTvShowsPaged = this.getPagedGeneral(this.castTvShows!);
  }

  getCrewTvShowsByPage(page: number) {
    this.crewTvShows!.page = page;
    this.crewTvShowsPaged = this.getPagedGeneral(this.crewTvShows!);
  }

  private getPagedGeneral(data: GenericResponse<Movie[] | TvShow[]>) {
    return {
      page: data.page,
      results: data.results.slice((data.page - 1) * this.totalItemsPerPage, (data.page - 1) * this.totalItemsPerPage + this.totalItemsPerPage),
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  }


}
