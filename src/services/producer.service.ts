import { Producer } from "../schemas/producer.schema";
import { rxDB } from "../db";

// return producers by parameters
export async function getProducers(order: 'asc' | 'desc', limit?: number) {
  const producers = await (await rxDB()).producers.find({ sort: [{ interval: order }], limit }).exec()
  return producers.map(producer => producer.toJSON());
}

// insert producers
export async function insertProducers(input: Array<Producer>) {
  return await (await rxDB()).producers.bulkInsert(input);
}