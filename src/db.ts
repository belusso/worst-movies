import { RxDatabase, createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/memory';
import { movieSchema } from './schemas/movie.schema';
import { producerSchema } from './schemas/producer.schema';
import { importCsv } from './services/csv.service';

let singleton: RxDatabase

export async function rxDB() {

  if (singleton) return singleton;

  console.log('Creating Database')
  singleton = await createRxDatabase({
    name: 'db-movies',
    storage: getRxStorageMemory()
  })

  await singleton.addCollections({
    movies: {
      schema: movieSchema
    },
    producers: {
      schema: producerSchema
    }
  })

  console.log('Importing data from CSV file')
  await importCsv()

  return singleton

}
