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

  getFloor(average: number): number {
    return Number(average.toFixed(1));
  }

  getPagesArray(): number[] {
    let result: number[] = [];
    let total: number = this.casts.total_pages;
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