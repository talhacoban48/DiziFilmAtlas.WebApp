import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { SeasonDetailsResponse } from '../../core/interfaces/seson-details.interface';
import { NavigationService } from '../../core/services/navigation.service';
import { SeasonService } from '../../core/services/season.service';
import { Footer } from '../../shared/footer/footer';
import { GeneralDetails } from '../../shared/general-details/general-details';
import { Navbar } from '../../shared/navbar/navbar';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-season-details',
  imports: [Spinner, GeneralDetails, Navbar, Footer],
  templateUrl: './season-details.html',
  styleUrl: './season-details.scss'
})
export class SeasonDetails {

  isLoading: boolean = false;
  seriesId!: number;
  seasonNumber!: number;
  seasonDetails!: SeasonDetailsResponse;

  constructor(
    private seasonService: SeasonService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.seriesId = Number(params['seriesId']);
      this.seasonNumber = Number(params['seasonNumber']);

      if (!this.seriesId || !this.seasonNumber) this.navigationSerive.navigateNotFound();

      this.getSeasonDetails();
    })
  }

  getSeasonDetails() {
    this.seasonService.getSeasonDetails(this.seriesId, this.seasonNumber)
      .pipe(
        map(details => {
          this.seasonDetails = details;
          console.log(this.seasonDetails)

        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }

}
