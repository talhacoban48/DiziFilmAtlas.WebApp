import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { NavigationService } from '../../core/services/navigation.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {

  imageUrl: string = environment.cdnUrl;
  isLoading: boolean = false;
  movieId!: number;

  constructor(
    private movieService: MoviesService,
    private navigationSerive: NavigationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.movieId = Number(params['movieId']);
      if (!this.movieId) this.navigationSerive.navigateNotFound();

      this.movieService.getMovieDetails(this.movieId)
        .pipe(
          map(res => {
            console.log(res)
          })
        )
        .subscribe()
      console.log("this.movieId", this.movieId)
    })
  }
}
