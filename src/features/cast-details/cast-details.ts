import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastService } from '../../core/services/casts.service';
import { NavigationService } from '../../core/services/navigation.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cast-details',
  imports: [],
  templateUrl: './cast-details.html',
  styleUrl: './cast-details.scss'
})
export class CastDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  castId!: number;

  constructor(
    private castService: CastService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.castId = Number(params['castId']);
      if (this.castId) this.navigationSerive.navigateNotFound();

    })
  }
}
