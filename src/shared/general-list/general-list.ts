import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListChip, menuForCasts, menuForMovies, menuForTvShows } from '../../core/data/list-chips';
import { roles } from '../../core/enums/roles.enum';
import { Cast } from '../../core/interfaces/cast.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { HelperService } from '../../core/services/helper.service';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-general-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './general-list.html',
  styleUrl: './general-list.scss'
})
export class GeneralList implements OnChanges {

  @Input() currentTitle?: string;
  @Input() currentPage: number = 1;
  @Input() generalList!: GenericResponse<Movie[] | TvShow[] | Cast[]>;
  kind: "movies" | "tvshows" | "casts" | undefined;
  imageUrl = environment.cdnUrl;
  roles = roles;

  menu: { label: string, name: string }[] = [];

  menuForMovies: ListChip[] = menuForMovies
  menuForTvShows: ListChip[] = menuForTvShows
  menuForCasts: ListChip[] = menuForCasts


  constructor(protected helperService: HelperService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["generalList"]?.currentValue) {
      const results = changes["generalList"]?.currentValue.results;
      console.log(results)
      if (results && results.length > 0) {
        const kind = this.getObjectKind(results[0]);
        if (kind == "movie") {
          this.menu = this.menuForMovies;
          this.kind = "movies";
        } else if (kind == "tvshow") {
          this.menu = this.menuForTvShows;
          this.kind = "tvshows";
        } else if (kind == "cast") {
          this.menu = this.menuForCasts;
          this.kind = "casts";
        } else {
          this.menu = [];
          this.kind = undefined;
        }
      } else {
        this.menu = [];
      }
    }
  }

  getRole(role: string) {
    return roles.find(r => r.role == role)?.label;
  }

  getFloor(average: number | string): string {
    return Number(average).toFixed(1);
  }

  getObjectKind(item: Movie | TvShow | Cast): "movie" | "tvshow" | "cast" | undefined {
    if ((item as Movie).title !== undefined) {
      return "movie";
    }
    if ((item as TvShow).name !== undefined && (item as TvShow).first_air_date !== undefined) {
      return "tvshow";
    }
    if ((item as Cast).profile_path !== undefined || (item as Cast).gender !== undefined) {
      return "cast";
    }
    return undefined;
  }

  isMovie(item: Movie | TvShow | Cast): item is Movie {
    return (item as Movie).title !== undefined;
  }

  isTvShow(item: Movie | TvShow | Cast): item is TvShow {
    return (item as TvShow).name !== undefined && (item as TvShow).first_air_date !== undefined;
  }

  isCast(item: Movie | TvShow | Cast): item is Cast {
    return (item as Cast).gender !== undefined;
  }

}
