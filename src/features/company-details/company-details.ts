import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { SortByEnum } from '../../core/enums/sort-by.enum';
import { CompanyDetailsResponse } from '../../core/interfaces/company-details.interface';
import { DiscoverMoviesDto } from '../../core/interfaces/dtos/discover-movies.dto';
import { DiscoverTvShowsDto } from '../../core/interfaces/dtos/discover-tvshows.dto';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { CompanyService } from '../../core/services/company.service';
import { DiscoverService } from '../../core/services/discover.service';
import { NavigationService } from '../../core/services/navigation.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralDetails } from '../../shared/general-details/general-details';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-company-details',
  imports: [Spinner, GeneralDetails, Navbar, Footer],
  templateUrl: './company-details.html',
  styleUrl: './company-details.scss'
})
export class CompanyDetails {

  isLoading: boolean = false;
  companyId!: number;
  companyDetails!: CompanyDetailsResponse;
  movies!: GenericResponse<Movie[]>;
  tvShows!: GenericResponse<TvShow[]>;

  discoverMoviesPayload = new DiscoverMoviesDto();
  discoverTvShowsPayload = new DiscoverTvShowsDto();

  constructor(
    private companyService: CompanyService,
    private discoverService: DiscoverService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.companyId = Number(params['companyId']);
      if (!this.companyId) this.navigationSerive.navigateNotFound();

      this.discoverMoviesPayload.page = 1;
      this.discoverMoviesPayload.sort_by = SortByEnum.popularity_desc;
      this.discoverMoviesPayload.with_companies = this.companyId;

      this.discoverTvShowsPayload.page = 1;
      this.discoverTvShowsPayload.sort_by = SortByEnum.popularity_desc;
      this.discoverTvShowsPayload.with_companies = this.companyId;

      let observables = [
        this.companyService.getCompanyDetails(this.companyId)
          .pipe(
            map((companyDetails) => {
              this.companyDetails = companyDetails;
              console.log("companyDetails", companyDetails)
            })
          ),
      ];

      observables.push(this.getMovies());
      observables.push(this.getTvShows());

      forkJoin(observables).pipe(finalize(() => this.isLoading = false)).subscribe();
    })
  }

  getMoviesByPage(page: number) {
    this.discoverMoviesPayload.page = page;
    this.getMovies().subscribe();
  }

  getTvShowByPage(page: number) {
    this.discoverTvShowsPayload.page = page;
    this.getTvShows().subscribe();
  }

  private getMovies() {
    return this.discoverService.discoverMovies(this.discoverMoviesPayload)
      .pipe(
        map((movies) => {
          this.movies = movies;
          console.log("movies", movies)
        })
      )
  }

  private getTvShows() {
    return this.discoverService.discoverTvshows(this.discoverTvShowsPayload)
      .pipe(
        map((tvShows) => {
          this.tvShows = tvShows;
          console.log("tvShows", tvShows)
        })
      )
  }
}
