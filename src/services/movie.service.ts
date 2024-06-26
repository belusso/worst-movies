
import { Movie } from "../schemas/movie.schema";
import { rxDB } from "../db";

// return all movies
export async function getMovies() {
  const movies = await (await rxDB()).movies.find().exec()
  return movies.map(movie => movie.toJSON());
}

// return movie by title
export async function getMovie(title: string) {
  const movie = await (await rxDB()).movies.findOne({ selector: { title } }).exec()
  return movie ? movie.toJSON() : null
}

// insert movies
export async function insertMovies(input: Array<Movie>) {
  return await (await rxDB()).movies.bulkInsert(input);
}
