import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, debounceTime } from 'rxjs';
import { ListChip, menuForSearch } from '../../core/data/list-chips';
import { SearchUrlParams } from '../../core/enums/url-params.enum';
import { Cast } from '../../core/interfaces/cast.interface';
import { Company } from '../../core/interfaces/company.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { NavigationService } from '../../core/services/navigation.service';
import { SearchService } from '../../core/services/search.service';
import { GeneralList } from '../../shared/general-list/general-list';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-search',
  imports: [Spinner, GeneralList],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  providers: [SearchService]
})
export class Search implements OnInit {

  result?: GenericResponse<Movie[] | TvShow[] | Cast[] | Company[]>;
  kind: "movies" | "tvshows" | "casts" | "companies" | undefined;
  navigateParams: { currentTitle: SearchUrlParams, page: number } = { currentTitle: SearchUrlParams.Movies, page: 1 };
  searchKey?: string = "";
  isLoading: boolean = true;
  menuForSearch: ListChip[] = menuForSearch;


  constructor(
    private searchService: SearchService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParamMap
    ])
      .pipe(
        debounceTime(50)
      )
      .subscribe(([params, queryParams]) => {
        this.navigateParams.currentTitle = params["category"];
        this.searchKey = queryParams.get('searchKey') ?? undefined;
        this.navigateParams.page = Number(queryParams.get('page')) || 1;

        console.log(this.navigateParams.currentTitle, this.searchKey, this.navigateParams.page);

        if (!this.searchKey) return;

        switch (this.navigateParams.currentTitle) {
          case SearchUrlParams.Movies:
            this.getMovies(this.navigateParams.page);
            return;
          case SearchUrlParams.TvShows:
            this.getTvShows(this.navigateParams.page);
            return;
          case SearchUrlParams.Casts:
            this.getCasts(this.navigateParams.page);
            return;
          case SearchUrlParams.Companies:
            this.getCompany(this.navigateParams.page);
            return;
          default:
            this.navigationService.navigateNotFound();
            break;
        }
      });
  }

  getMovies(page: number) {
    this.searchService.searchMovies(this.searchKey!, page).subscribe(movies => {
      this.result = movies;
      this.kind = "movies";
      this.isLoading = false;
    })
  }

  getTvShows(page: number) {
    this.searchService.searchTvShows(this.searchKey!, page).subscribe(tvShows => {
      this.result = tvShows;
      this.kind = "tvshows";
      this.isLoading = false;
    })
  }

  getCasts(page: number) {
    this.searchService.searchCasts(this.searchKey!, page).subscribe(casts => {
      this.result = casts;
      this.kind = "casts";
      this.isLoading = false;
    })
  }

  getCompany(page: number) {
    this.searchService.searchCompany(this.searchKey!, page).subscribe(companies => {
      console.log(companies)
      this.result = companies;
      this.kind = "companies";
      this.isLoading = false;
    })
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    return this.navigationService.navigateTo(["search", params.currentTitle], {
      searchKey: this.searchKey,
      page: params.page,
    })
  }
}
