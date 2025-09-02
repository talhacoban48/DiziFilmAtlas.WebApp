import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ListChip, menuForCasts } from '../../core/data/list-chips';
import { CastsSearchUrlParams } from '../../core/enums/url-params.enum';
import { Cast } from '../../core/interfaces/cast.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { CastService } from '../../core/services/casts.service';
import { NavigationService } from '../../core/services/navigation.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralList } from '../../shared/general-list/general-list';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-casts',
  imports: [Spinner, GeneralList, Navbar, Footer],
  templateUrl: './casts.html',
  styleUrl: './casts.scss'
})
export class Casts {

  casts!: GenericResponse<Cast[]>;
  navigateParams: { currentTitle: CastsSearchUrlParams, page: number } = { currentTitle: CastsSearchUrlParams.Popular, page: 1 };
  isLoading: boolean = false;
  menuForCasts: ListChip[] = menuForCasts;

  constructor(
    private castService: CastService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.navigateParams.currentTitle = params["category"];
      console.log(this.navigateParams)

      this.navigateParams.page = Number(params["page"]) ?? 1;
      if (!this.navigateParams.page) this.navigateParams.page = 1;

      if (!this.navigateParams.currentTitle || this.navigateParams.currentTitle == CastsSearchUrlParams.Popular) {
        this.navigateParams.currentTitle = CastsSearchUrlParams.Popular;
        this.castService.getPopularCelebritiesList(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(casts => this.casts = casts)
          )
          .subscribe();
      } else if (this.navigateParams.currentTitle == CastsSearchUrlParams.Trending) {
        this.navigateParams.currentTitle = CastsSearchUrlParams.Trending;
        this.castService.getTrendingCelebritiesList(this.navigateParams.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(casts => this.casts = casts)
          )
          .subscribe();
      }
    })
  }

  navigateByParams(params: { currentTitle: string, page: number }) {
    return this.navigationService.navigateTo(["casts", params.currentTitle, params.page])
  }


}