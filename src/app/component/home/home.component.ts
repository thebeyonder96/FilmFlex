import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Tmovies!: Observable<Movie[]>;
  Pmovies!: Observable<Movie[]>;
  Umovies!: Observable<Movie[]>;
  TvShows!: Observable<Movie[]>;
  base_img = 'https://image.tmdb.org/t/p/w500';
  inp:any;
  out:any;
  Switch=false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.Tmovies = this.movieService.getTrending('day');

    this.Pmovies = this.movieService.getPopular();

    this.Umovies = this.movieService.getUpcoming();

    this.TvShows = this.movieService.getTvShow();

  }

  onSubmit(f:any){
    this.inp = f.value
    this.movieService.search(this.inp.query).subscribe((val:any)=>{
      this.out = val.results;
      console.log(this.out);

    })
  }

  switch(){
    this.Switch = !this.Switch
  }

}
