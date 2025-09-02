import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { Countries } from '../../core/data/countries';
import { movieGenres } from '../../core/data/genres';
import { Languages } from '../../core/data/languages';
import { ListChip, menuForMovies } from '../../core/data/list-chips';
import { SortByData } from '../../core/data/sort-by';
import { MovieSearchUrlParams } from '../../core/enums/url-params.enum';
import { DiscoverMoviesDto } from '../../core/interfaces/dtos/discover-movies.dto';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { ProvidersResponse } from '../../core/interfaces/providers.interface';
import { DiscoverService } from '../../core/services/discover.service';
import { NavigationService } from '../../core/services/navigation.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralList } from '../../shared/general-list/general-list';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-discover-movies',
  imports: [
    Navbar,
    Footer,
    Spinner,
    GeneralList,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './discover-movies.html',
  styleUrl: './discover-movies.scss'
})
export class DiscoverMovies implements OnInit {

  movies?: GenericResponse<Movie[]>;
  navigateParams: { currentTitle: MovieSearchUrlParams, page: number } = { currentTitle: MovieSearchUrlParams.Discover, page: 1 };
  isLoading: boolean = true;
  menuForMovies: ListChip[] = menuForMovies;
  model!: DiscoverMoviesDto;
  countries = Countries;
  languages = Languages.filter(l => l.iso_639_1 != "xx");
  genres = movieGenres;
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
      this.model = new DiscoverMoviesDto(params);
      const observables = [
        this.discoverService.discoverMovies(this.model)
          .pipe(
            map(movies => {
              // console.log(this.model, movies)
              this.movies = movies;
            }),
          ),
        this.discoverService.getProviders("movie")
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
    return this.navigationService.navigateTo(["movies", "discover"], { queryParams: this.model })
  }

  clear() {
    this.model = new DiscoverMoviesDto();
    this.filterBySearch();
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    if (params.currentTitle == "discover") {
      this.model.page = params.page;
      this.filterBySearch();
    } else {
      return this.navigationService.navigateTo(["movies", params.currentTitle, params.page])
    }
  }
}
