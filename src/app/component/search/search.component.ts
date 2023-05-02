import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query!: string;
  out: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    route.params.subscribe((val) => {
      console.log(val['query']);
      this.movieService.search(val['query']).subscribe((val: any) => {
        console.log(val);

        this.out = val.results;
      });
    });
  }
}
