import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cast, CastsCrews } from '../../core/interfaces/cast-crews.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Image } from '../../core/interfaces/images-response.interface';
import { MovieDetailsResponse } from '../../core/interfaces/movie-details.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { ReviewsResponse } from '../../core/interfaces/reviews-response.interface';
import { TvShowDetailsResponse } from '../../core/interfaces/tvshow-details.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { Video } from '../../core/interfaces/videos-response.interface';
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
    GeneralList,
  ],
  templateUrl: './general-details.html',
  styleUrl: './general-details.scss'
})
export class GeneralDetails {

  basePath: string = environment.basePath;
  imageUrl: string = environment.cdnUrl;
  @Input() generalId!: number;
  @Input() generalDetails!: TvShowDetailsResponse | MovieDetailsResponse;
  @Input() castsCrews!: CastsCrews;
  @Input() images!: Image[];
  @Input() videos!: Video[];
  @Input() reviews!: ReviewsResponse;
  @Input() similarGenerals!: GenericResponse<TvShow[] | Movie[]>;
  @Output() similarGeneralsPageOutput = new EventEmitter();
  similarGeneralsPage: number = 1;
  isInUserFavorite = false;
  openedReviewIds: string[] = [];

  constructor(
    protected helperService: HelperService,
  ) { }

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

  isMovie(item: TvShowDetailsResponse | MovieDetailsResponse): item is MovieDetailsResponse {
    return (item as MovieDetailsResponse).title !== undefined;
  }

  isTvShow(item: TvShowDetailsResponse | MovieDetailsResponse): item is TvShowDetailsResponse {
    return (item as TvShowDetailsResponse).name !== undefined && (item as TvShowDetailsResponse).first_air_date !== undefined;
  }

  isCast(item: Movie | TvShow | Cast): item is Cast {
    return (item as Cast).gender !== undefined;
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
}
