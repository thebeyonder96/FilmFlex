import {
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MovieService } from './services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Port';
  isShow = false;
  inp: any;
  nav = false;
  user!: string | null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.user = localStorage.getItem('logUser');
  }
  ngOnInit(): void {
    this.user = localStorage.getItem('logUser');
    console.log(JSON.stringify(this.user));
  }

  toggleNav() {
    this.isShow = !this.isShow;
  }

  navMob(f: any) {
    this.inp = f.value;
    this.movieService.search(this.inp.query).subscribe((val: any) => {
      // this.out = val.results;
    });
    this.isShow = !this.isShow;
  }

  onSubmit(f: any) {
    this.inp = f.value;
  }

  logout() {
    localStorage.removeItem('logUser');
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
