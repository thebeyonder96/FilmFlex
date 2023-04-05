import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  movieId!: number;
  movieDetail!: any;

  @Input() data: any;

  constructor(private service: MovieService, private route: ActivatedRoute) {
    this.route.params.subscribe((val) => (this.movieId = val['id']));
    this.service.singleMovie(this.movieId).subscribe(async (val: any) => {
      console.log(val);
      this.movieDetail = await val;
    });
  }

  ngOnInit(): void {

  }
}
