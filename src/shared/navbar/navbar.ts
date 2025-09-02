import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  searchKey = new FormControl();

  constructor(
    private navigationService: NavigationService,
  ) { }

  search() {
    if (this.searchKey.value) {
      this.navigationService.navigateTo(
        ["search", "movies"],
        {
          queryParams: {
            searchKey: this.searchKey.value,
            page: 1
          }
        }
      );
    }
  }

}
