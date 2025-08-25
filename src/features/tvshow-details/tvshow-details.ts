import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { NavigationService } from '../../core/services/navigation.service';
import { TvShowsService } from '../../core/services/tvshows.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tvshow-details',
  imports: [],
  templateUrl: './tvshow-details.html',
  styleUrl: './tvshow-details.scss'
})
export class TvshowDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  tvShowId!: number;

  constructor(
    private tvShowService: TvShowsService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.tvShowId = Number(params['tvShowId']);
      if (!this.tvShowId) this.navigationSerive.navigateNotFound();

      this.tvShowService.getTvShowDetails(this.tvShowId)
        .pipe(
          map(res => {
            console.log(res)
          })
        )
        .subscribe();

      console.log("this.tvShowId", this.tvShowId)
    })
  }
}
