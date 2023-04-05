import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Port';
  isShow = false;
  inp: any;
  out: any;

  constructor(private movieService:MovieService){
  }

  toggleNav() {
    this.isShow = !this.isShow;
  }

  onSubmit(f: any) {
    this.inp = f.value;
    this.movieService.search(this.inp.query).subscribe((val: any) => {
      this.out = val.results;
      console.log(this.out);
    });
  }
}
