import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  imgUrl!: string;
  Tmovies!: Observable<Movie[]>;

  constructor(private tmdb: MovieService) {
    this.imgUrl = tmdb.base_img;
    this.Tmovies = this.tmdb.getTrending('day');
    console.log(this.Tmovies);

  }
}
