import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleMovieComponent } from './component/single-movie/single-movie.component';

const routes: Routes = [
  {path:'single/:id',component:SingleMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
