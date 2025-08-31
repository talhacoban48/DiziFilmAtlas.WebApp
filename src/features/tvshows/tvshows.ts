import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ListChip, menuForTvShows } from '../../core/data/list-chips';
import { TvShowsSearchUrlParams } from '../../core/enums/url-params.enum';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { NavigationService } from '../../core/services/navigation.service';
import { TvShowsService } from '../../core/services/tvshows.service';
import { GeneralList } from '../../shared/general-list/general-list';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-tvshows',
  imports: [Spinner, GeneralList],
  templateUrl: './tvshows.html',
  styleUrl: './tvshows.scss'
})
export class Tvshows {

  tvShows!: GenericResponse<TvShow[]>;
  navigateParams: { currentTitle: TvShowsSearchUrlParams, page: number } = { currentTitle: TvShowsSearchUrlParams.AiringToday, page: 1 };
  isLoading: boolean = true;
  menuForTvShows: ListChip[] = menuForTvShows;

  constructor(
    private tvshowService: TvShowsService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.navigateParams.currentTitle = params["category"];
      this.navigateParams.page = Number(params["page"]) ?? 1;
      if (!this.navigateParams.page) this.navigateParams.page = 1;

      console.log(this.navigateParams.currentTitle)

      if (!this.navigateParams.currentTitle || this.navigateParams.currentTitle == TvShowsSearchUrlParams.AiringToday) {
        this.navigateParams.currentTitle = TvShowsSearchUrlParams.AiringToday;
        this.tvshowService.getAiringTodayTvShows(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == TvShowsSearchUrlParams.Airing) {
        this.navigateParams.currentTitle = TvShowsSearchUrlParams.Airing;
        this.tvshowService.getOnTheAirTvShows(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == TvShowsSearchUrlParams.TopRated) {
        this.navigateParams.currentTitle = TvShowsSearchUrlParams.TopRated;
        this.tvshowService.getTopRatedTvShows(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == TvShowsSearchUrlParams.UpComing) {
        this.navigateParams.currentTitle = TvShowsSearchUrlParams.UpComing;
        this.tvshowService.getPopularTvShows(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(tvShows => this.tvShows = tvShows)
          )
          .subscribe();
      }
    })
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    return this.navigationService.navigateTo(["tvshows", params.currentTitle, params.page])
  }
}
