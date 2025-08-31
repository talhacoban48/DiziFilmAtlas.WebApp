import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackdropSizes, LogoSizes, PosterSizes, ProfileSizes } from '../../core/enums/image-size';
import { Cast, CastsCrews, Crew } from '../../core/interfaces/cast-crews.interface';
import { CastDetailResponse } from '../../core/interfaces/cast-details.interface';
import { CompanyDetailsResponse } from '../../core/interfaces/company-details.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { CollectionDetailsResponse, MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { Provider } from '../../core/interfaces/providers.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { SeasonDetailsResponse } from '../../core/interfaces/seson-details.interface';
import { TvShowDetailsResponse } from '../../core/interfaces/tvshow-details.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
import { CalculateAgePipe } from '../../core/pipes/calculate-age.pipe';
import { DayMonthYearPipe } from '../../core/pipes/date.pipe';
import { DurationPipe } from '../../core/pipes/time.pipe';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { TurkishCurrencyPipe } from '../../core/pipes/turkish-currency.pipe';
import { TurkishLanguagePipe } from '../../core/pipes/turkish-language.pipe';
import { HelperService } from '../../core/services/helper.service';
import { environment } from '../../environments/environment';
import { GeneralList } from '../general-list/general-list';

@Component({
  selector: 'app-general-details',
  imports: [
    RouterLink,
    DayMonthYearPipe,
    DurationPipe,
    TurkishCurrencyPipe,
    TruncatePipe,
    CalculateAgePipe,
    TurkishLanguagePipe,
    GeneralList,
    CommonModule
  ],
  templateUrl: './general-details.html',
  styleUrl: './general-details.scss'
})
export class GeneralDetails implements OnInit {

  basePath: string = environment.basePath;
  imageUrl: string = environment.cdnUrl;
  backdropSize = BackdropSizes.w300;
  backdropSizeTarget = BackdropSizes.w780;
  posterSize = PosterSizes.w500;
  logoSizeBigger = LogoSizes.w300;
  logoSize = LogoSizes.w45;
  avatarSize = ProfileSizes.w45;
  selectedImage?: string;
  selectedImagePath: string = `${this.imageUrl}/${this.backdropSizeTarget}/`;

  @Input() generalName!: string;
  @Input() generalId!: number;
  @Input() generalDetails!: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse;
  @Input() castsCrews?: CastsCrews;
  @Input() images?: Image[];
  @Input() videos?: Video[];
  @Input() reviews?: ReviewsResponse;
  @Input() movies?: GenericResponse<Movie[]>;
  @Input() tvShows?: GenericResponse<TvShow[]>;
  @Input() providers?: Provider[];
  @Input() collection?: CollectionDetailsResponse;
  @Input() castMovies?: GenericResponse<Movie[]>;
  @Input() crewMovies?: GenericResponse<Movie[]>;
  @Input() castTvShows?: GenericResponse<TvShow[]>;
  @Input() crewTvShows?: GenericResponse<TvShow[]>;
  @Output() currentMoviesPageOutput = new EventEmitter();
  @Output() currentTvShowsPageOutput = new EventEmitter();

  castsPaged?: GenericResponse<Cast[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };
  crewsPaged?: GenericResponse<Crew[]> = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };
  castMoviesPaged?: GenericResponse<Movie[] | TvShow[]>;
  crewMoviesPaged?: GenericResponse<Movie[] | TvShow[]>;
  castTvShowsPaged?: GenericResponse<Movie[] | TvShow[]>;
  crewTvShowsPaged?: GenericResponse<Movie[] | TvShow[]>;

  totalItemsPerPage: number = 10;
  totalCastsCrewsPerPage: number = 10;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    protected helperService: HelperService,
  ) { }

  ngOnInit(): void {

    if ((this.isMovie(this.generalDetails) || this.isTvShow(this.generalDetails) || this.isCast(this.generalDetails)) && this.images && this.images.length > 0) {
      this.selectedImage = this.images[0].file_path;
    }

    if (this.collection) {
      this.collection!.parts = [...this.collection!.parts].sort((a, b) => {
        if (!a.release_date) return 1;
        if (!b.release_date) return -1;
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      });
    };
    if (this.castsCrews) {
      this.castsPaged = {
        page: 1,
        results: this.castsCrews.casts.slice(0, this.totalCastsCrewsPerPage),
        total_pages: Math.ceil(this.castsCrews.casts.length / this.totalCastsCrewsPerPage),
        total_results: this.castsCrews.casts.length,
      };
      this.crewsPaged = {
        page: 1,
        results: this.castsCrews.crews.slice(0, this.totalCastsCrewsPerPage),
        total_pages: Math.ceil(this.castsCrews.crews.length / this.totalCastsCrewsPerPage),
        total_results: this.castsCrews.crews.length,
      };
    }
    if (this.castMovies) {
      this.castMoviesPaged = (this.getPagedGeneral(this.castMovies) as GenericResponse<Movie[]>);
    }
    if (this.crewMovies) {
      this.crewMoviesPaged = (this.getPagedGeneral(this.crewMovies) as GenericResponse<Movie[]>);
    }
    if (this.castTvShows) {
      this.castTvShowsPaged = (this.getPagedGeneral(this.castTvShows) as GenericResponse<TvShow[]>);
    }
    if (this.crewTvShows) {
      this.crewTvShowsPaged = (this.getPagedGeneral(this.crewTvShows) as GenericResponse<TvShow[]>);
    }

  }

  trackByVideoKey(index: number, video: any) {
    return video.key; // Her video için unique key
  }

  addFavorite(id: number) {

  }

  RemoveFavorite(id: number) {

  }

  toImageLeft() {
    const image = this.images!.shift();
    if (image) {
      this.images!.push(image);
    }
  }

  toImageRight() {
    const image = this.images!.pop();
    if (image) {
      this.images!.unshift(image);
    }
  }

  readAllToggle(id: string) {
    if (this.openedReviewIds.includes(id)) {
      this.openedReviewIds = this.openedReviewIds.filter(reviewId => reviewId != id);
    } else {
      this.openedReviewIds.push(id);
    }
  }

  isMovie(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse): item is MovieDetailsResponse {
    return (item as MovieDetailsResponse).title !== undefined;
  }

  isTvShow(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse): item is TvShowDetailsResponse {
    return (item as TvShowDetailsResponse).name !== undefined && (item as TvShowDetailsResponse).first_air_date !== undefined;
  }

  isCast(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse): item is CastDetailResponse {
    return (item as CastDetailResponse).gender !== undefined;
  }

  isCompany(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse): item is CompanyDetailsResponse {
    return (item as CompanyDetailsResponse).headquarters !== undefined;
  }

  isSeason(item: TvShowDetailsResponse | MovieDetailsResponse | CastDetailResponse | CompanyDetailsResponse | SeasonDetailsResponse): item is SeasonDetailsResponse {
    return (item as SeasonDetailsResponse).season_number !== undefined;
  }


  getMoviesByPage(page: number) {
    this.currentMoviesPageOutput.emit(page);
  }

  getTvShowsByPage(page: number) {
    this.currentTvShowsPageOutput.emit(page);
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

  getCastsByPage(page: number) {
    this.castsPaged = {
      page: page,
      results: this.castsCrews!.casts.slice((page - 1) * this.totalCastsCrewsPerPage, (page - 1) * this.totalCastsCrewsPerPage + this.totalCastsCrewsPerPage),
      total_pages: Math.ceil(this.castsCrews!.casts.length / this.totalCastsCrewsPerPage),
      total_results: this.castsCrews!.casts.length,
    };
  }

  getCrewsByPage(page: number) {
    this.crewsPaged = {
      page: page,
      results: this.castsCrews!.crews.slice((page - 1) * this.totalCastsCrewsPerPage, (page - 1) * this.totalCastsCrewsPerPage + this.totalCastsCrewsPerPage),
      total_pages: Math.ceil(this.castsCrews!.crews.length / this.totalCastsCrewsPerPage),
      total_results: this.castsCrews!.crews.length,
    };
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
