import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListChip } from '../../core/data/list-chips';
import { PosterSizes } from '../../core/enums/image-size';
import { roles } from '../../core/enums/roles.enum';
import { Cast } from '../../core/interfaces/cast.interface';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tvshows.interface';
import { HelperService } from '../../core/services/helper.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-general-list',
  imports: [DatePipe],
  templateUrl: './general-list.html',
  styleUrl: './general-list.scss'
})
export class GeneralList {

  @Input() navigateParams?: { currentTitle: string, page: number };
  @Input() generalList!: GenericResponse<Movie[] | TvShow[] | Cast[]>;
  @Input() menu: ListChip[] = [];
  @Input() kind: "movies" | "tvshows" | "casts" | undefined;
  @Output() navigateParamsEmitter = new EventEmitter<{ currentTitle: string, page: number }>();

  imageUrl = environment.cdnUrl;
  posterSize = PosterSizes.w300;
  roles = roles;

  constructor(protected helperService: HelperService) { }

  getRole(role: string) {
    return roles.find(r => r.role == role)?.label;
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

  navigate(currentTitle: string, page: number) {
    this.navigateParams!.currentTitle = currentTitle;
    this.navigateParams!.page = page;
    this.navigateParamsEmitter.emit(this.navigateParams);
  }

}
