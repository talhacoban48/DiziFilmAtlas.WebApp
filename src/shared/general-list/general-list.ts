import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Type } from '../../core/enums/input-general_type.enum';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Movie } from '../../core/interfaces/movie.interface';
import { TvShow } from '../../core/interfaces/tv-shows.interface';



@Component({
  selector: 'app-general-list',
  imports: [],
  templateUrl: './general-list.html',
  styleUrl: './general-list.scss'
})
export class GeneralList implements OnChanges {

  @Input() type!: Type;
  @Input() generalList!: GenericResponse<Movie[] | TvShow[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["generalList"]) {

    }
  }
}
