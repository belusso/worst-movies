
import { Movie } from "../schemas/movie.schema";
import csvParser from 'csv-parser'
import fs from 'fs'
import { Producer } from "../schemas/producer.schema";
import { insertMovies } from "./movie.service";
import { insertProducers } from "./producer.service";

// constants
const FILE_NAME = 'movielist.csv'
const SEPARATOR = ';'
const SEPARATOR_PRODUCERS_NAME = /, | and /

// function to import data from csv file
export async function importCsv() {

  const readStream = fs.createReadStream(FILE_NAME);
  const parser = csvParser({ separator: SEPARATOR });
  const movies = new Array<Movie>()
  const producers = new Array<Producer>()
  readStream.pipe(parser);

  // this funciton will check if producer is in list 
  const checkProducersList = (movie: Movie) => {
    const producersList = movie.producers.split(SEPARATOR_PRODUCERS_NAME) // split producers name
    for (const producerName of producersList) {
      const producer = producers.filter(e => !e.followingWin).find(e => e.producer == producerName) //only producers without second win 
      if (producer) { // in list, this is the second win
        producer.followingWin = movie.year
        producer.interval = producer.followingWin - producer.previousWin
      } else { // not in list, this is the first producer win
        producers.push({ producer: producerName, previousWin: movie.year, followingWin: 0, interval: 0 })
      }
    }
  }

  for await (const movie of parser) {
    movie.winner = movie.winner === 'yes'; // converting to boolean
    movie.year = +movie.year // converting to integer
    // if winner, put on producers list
    if (movie.winner) {
      checkProducersList(movie)
    }
    movies.push(movie);
  }

  // insert all movies
  await insertMovies(movies)

  // insert the producers
  await insertProducers(producers.filter(e => e.interval > 0)) // only winners two or more times 

}