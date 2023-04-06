import { Component, HostListener } from '@angular/core';
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
  nav = false;

  constructor(private movieService: MovieService) {}

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

  @HostListener('document:scroll')
  onScroll() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 10
    ) {
      this.nav = true;
    } else {
      this.nav = false;
    }
  }
}
