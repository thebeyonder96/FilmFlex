import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  switchMap,
} from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { fadeInOut } from '../../animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut],
})
export class HomeComponent implements OnInit {
  $Movies!: Observable<Movie[]>;
  Tmovies!: Observable<Movie[]>;
  Pmovies!: Observable<Movie[]>;
  Umovies!: Observable<Movie[]>;
  TvShows!: Observable<Movie[]>;
  base_img = 'https://image.tmdb.org/t/p/w500';
  inp: any;
  out: any;
  Switch = false;
  users!: any;
  loggedUser: any;

  $Trending!: Observable<Movie[]>;
  $timeFilter = new BehaviorSubject<timeInterval>('day');
  $showFilter = new BehaviorSubject<showInterval>('movie');

  $filter = combineLatest({
    time: this.$timeFilter,
    show: this.$showFilter,
  });

  constructor(
    private movieService: MovieService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Tmovies = this.movieService.getTrending('day');

    this.Pmovies = this.movieService.getPopular();

    this.Umovies = this.movieService.getUpcoming();

    this.TvShows = this.movieService.getTvShow();

    this.$Movies = this.$timeFilter.pipe(
      switchMap((time) => this.movieService.getTrending(time))
    );

    this.$Trending = this.$filter.pipe(
      switchMap(({ time, show }) => {
        return this.movieService.getTrendingAll(time, show);
      })
    );

    this.users = this.movieService.user();
    console.log(this.users);

    this.route.params.subscribe((val) => (this.loggedUser = val));
  }

  onTime(data: timeInterval) {
    this.$timeFilter.next(data);
  }

  onShow(data: showInterval) {
    this.$showFilter.next(data);
  }

  onSubmit(f: any) {
    this.inp = f.value;
    this.movieService.search(this.inp.query).subscribe((val: any) => {
      this.out = val.results;
      console.log(this.out);
    });
  }

  switch(time: 'day' | 'week') {
    this.Switch = !this.Switch;
    this.$timeFilter.next(time == 'day' ? 'week' : 'day');
    console.log(time);
    this.$Movies = this.$timeFilter.pipe(
      switchMap((time) => this.movieService.getTrending(time))
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    navSpeed: 400,
    autoplay: true,
    dots: false,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };
}
type timeInterval = 'day' | 'week';
type showInterval = 'tv' | 'movie';
