import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { TvShowsSearchUrlParams } from '../../core/enums/url-params.enum';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { TvShow } from '../../core/interfaces/tv-shows.interface';
import { TvShowsService } from '../../core/services/tvshows.service';
import { environment } from '../../environments/environment';
import { GeneralList } from '../../shared/general-list/general-list';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-tvshows',
  imports: [Spinner, GeneralList],
  templateUrl: './tvshows.html',
  styleUrl: './tvshows.scss'
})
export class Tvshows {

  imageUrl = environment.cdnUrl;
  tvShows!: GenericResponse<TvShow[]>;
  currentTitle: TvShowsSearchUrlParams = TvShowsSearchUrlParams.AiringToday;
  page: number = 1;
  isLoading: boolean = true;

  constructor(
    private tvshowService: TvShowsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.currentTitle = params["category"];
      this.page = Number(params["page"]) ?? 1;
      if (!this.page) this.page = 1;

      if (!this.currentTitle || this.currentTitle == TvShowsSearchUrlParams.AiringToday) {
        this.currentTitle = TvShowsSearchUrlParams.AiringToday;
        this.tvshowService.getAiringTodayTvShows(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.currentTitle == TvShowsSearchUrlParams.Airing) {
        this.currentTitle = TvShowsSearchUrlParams.Airing;
        this.tvshowService.getOnTheAirTvShows(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.currentTitle == TvShowsSearchUrlParams.TopRated) {
        this.currentTitle = TvShowsSearchUrlParams.TopRated;
        this.tvshowService.getTopRatedTvShows(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.currentTitle == TvShowsSearchUrlParams.UpComing) {
        this.currentTitle = TvShowsSearchUrlParams.UpComing;
        this.tvshowService.getPopularTvShows(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      }
    })
  }

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.tvShows.total_pages;
    if (total > 500) {
      total = 500;
    }
    let array: number[] = [1, 2, 3, 4, this.page - 1, this.page, this.page + 1, this.page + 2, total - 2, total - 1, total]

    for (let i of array) {
      if (!result.includes(i) && i != 0 && Math.max(...result) < i && i < total) {
        result.push(i);
      }
    }
    return result;
  }
}
