import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { CastsSearchUrlParams } from '../../core/enums/url-params.enum';
import { Cast } from '../../core/interfaces/cast.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { CastService } from '../../core/services/casts.service';
import { environment } from '../../environments/environment';
import { GeneralList } from '../../shared/general-list/general-list';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-casts',
  imports: [Spinner, GeneralList],
  templateUrl: './casts.html',
  styleUrl: './casts.scss'
})
export class Casts {
  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  casts!: GenericResponse<Cast[]>;
  currentTitle: CastsSearchUrlParams = CastsSearchUrlParams.Popular;
  page: number = 1;

  constructor(
    private castService: CastService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.currentTitle = params["category"];
      console.log(this.currentTitle)

      this.page = Number(params["page"]) ?? 1;
      if (!this.page) this.page = 1;

      if (!this.currentTitle || this.currentTitle == CastsSearchUrlParams.Popular) {
        this.currentTitle = CastsSearchUrlParams.Popular;
        this.castService.getPopularCelebritiesList(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(casts => this.casts = casts)
          )
          .subscribe();
      } else if (this.currentTitle == CastsSearchUrlParams.Trending) {
        this.currentTitle = CastsSearchUrlParams.Trending;
        this.castService.getTrendingCelebritiesList(this.page)
          .pipe(
            finalize(() => this.isLoading = false),
            map(casts => this.casts = casts)
          )
          .subscribe();
      }
    })
  }



}