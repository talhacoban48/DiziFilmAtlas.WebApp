import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../shared/footer/footer";
import { Navbar } from "../shared/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    Navbar,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'

})
export class App {
}
