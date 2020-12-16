import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IMovie } from "../models/i-movie.interface";
import { GetMovieByTitle } from "./movies.actions";

export class MovieStateModel {
  movie: IMovie;
}

@State<MovieStateModel>({
  name: "movie",
  defaults: {
    movie: null,
  },
})
export class MovieState {
  @Selector()
  public static movie(state: MovieStateModel): IMovie {
    return state.movie;
  }

  @Action(GetMovieByTitle)
  getMovieByTitle(
    ctx: StateContext<MovieStateModel>,
    action: GetMovieByTitle
  ){
    const state = ctx.getState();
    let query = {};

    if(action.payload){
        query = action.payload
    }

    return null
    
  }
}
