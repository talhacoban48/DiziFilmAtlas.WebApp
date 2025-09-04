import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { Countries } from '../../core/data/countries';
import { tvGenres } from '../../core/data/genres';
import { Languages } from '../../core/data/languages';
import { ListChip, menuForTvShows } from '../../core/data/list-chips';
import { SortByData } from '../../core/data/sort-by';
import { TvShowsSearchUrlParams } from '../../core/enums/url-params.enum';
import { DiscoverTvShowsDto } from '../../core/interfaces/dtos/discover-tvshows.dto';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { ProvidersResponse } from '../../core/interfaces/providers.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { DiscoverService } from '../../core/services/discover.service';
import { NavigationService } from '../../core/services/navigation.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralList } from '../../shared/general-list/general-list';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-discover-tvshows',
  imports: [
    Navbar,
    Footer,
    Spinner,
    GeneralList,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './discover-tvshows.html',
  styleUrl: './discover-tvshows.scss'
})
export class DiscoverTvshows {

  tvShows?: GenericResponse<TvShow[]>;
  navigateParams: { currentTitle: TvShowsSearchUrlParams, page: number } = { currentTitle: TvShowsSearchUrlParams.Discover, page: 1 };
  isLoading: boolean = true;
  menuForTvShows: ListChip[] = menuForTvShows;
  model!: DiscoverTvShowsDto;
  countries = Countries;
  languages = Languages.filter(l => l.iso_639_1 != "xx");
  genres = tvGenres;
  providers?: ProvidersResponse;
  years?: number[];
  sortByData = SortByData;

  constructor(
    private route: ActivatedRoute,
    private discoverService: DiscoverService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // query param’dan model oluştur
      this.model = new DiscoverTvShowsDto(params);
      const observables = [
        this.discoverService.discoverTvshows(this.model)
          .pipe(
            map(tvShows => {
              console.log(this.tvShows, tvShows)
              this.tvShows = tvShows;
            }),
          ),
        this.discoverService.getProviders("tv")
          .pipe(
            map(providers => {
              this.providers = providers;
            })
          )
      ]
      forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe();
    });
    this.years = this.discoverService.getYears();
  }

  filterBySearch() {
    return this.navigationService.navigateTo(["tvshows", "discover"], { queryParams: this.model })
  }

  clear() {
    this.model = new DiscoverTvShowsDto();
    this.filterBySearch();
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    if (params.currentTitle == "discover") {
      this.model.page = params.page;
      this.filterBySearch();
    } else {
      return this.navigationService.navigateTo(["tvshows", params.currentTitle, params.page])
    }
  }
}
