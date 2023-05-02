import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieResponse } from '../models/movie';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'https://api.themoviedb.org/3/';
  base_img = 'https://image.tmdb.org/t/p/w500';
  api_key = 'c31b79d8af1e9e9b5514590169278722';

  constructor(private http: HttpClient) {}

  getTrending(data: 'week' | 'day'): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/trending/all/${data}`, {
        params: {
          api_key: this.api_key,
        },
      })
      .pipe(
        map((res) => {
          return res.results;
        })
      );
  }

  getTrendingAll(
    time: 'day' | 'week',
    show: 'movie' | 'tv'
  ): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/trending/${show}/${time}`, {
        params: {
          api_key: this.api_key,
        },
      })
      .pipe(
        map((res) => {
          return res.results;
        })
      );
  }

  getPopular(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/popular`, {
        params: {
          api_key: this.api_key,
        },
      })
      .pipe(map((res) => res.results));
  }

  getUpcoming(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/upcoming`, {
        params: {
          api_key: this.api_key,
        },
      })
      .pipe(map((res) => res.results));
  }

  getTvShow(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/tv/popular`, {
        params: {
          api_key: this.api_key,
        },
      })
      .pipe(map((res) => res.results));
  }

  search(name: string) {
    return this.http.get(`${this.baseUrl}search/movie`, {
      params: {
        api_key: this.api_key,
        query: name,
      },
    });
  }

  singleMovie(id: number,show:string) {

      return this.http.get(`${this.baseUrl}/${show}/${id}`, {
        params: {
          api_key: this.api_key,
        },
      });


  }

  user() {
    return this.http
      .get<UserResponse>('https://dummyjson.com/users')
      .pipe(map((res) => res.users));
  }
}



