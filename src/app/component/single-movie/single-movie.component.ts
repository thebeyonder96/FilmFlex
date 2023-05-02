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
  show!:string;
  type: any;
  movieDetails!: any;
  imageUrl = 'https://image.tmdb.org/t/p/original';

  @Input() data: any;

  constructor(private service: MovieService, private route: ActivatedRoute) {
    this.route.params.subscribe((val) => {
      console.log(val);

      this.movieId = val['id'];
      this.show = val['show']
      this.service.singleMovie(this.movieId,this.show).subscribe(async (val: any) => {
        this.movieDetails = await val;
        console.log(this.movieDetails);
      });
    });
  }

  ngOnInit(): void {}
}
