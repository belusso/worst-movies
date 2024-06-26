import { Request, Response } from 'express';
import { getProducers } from '../services/producer.service';

// route to get producers 
export const producersByInterval = async (req: Request, res: Response) => {
  try {
    const producers = await getProducers('asc')
    const minInterval = producers.at(0).interval
    const maxInterval = producers.at(-1).interval
    const result = {
      min: producers.filter(e => e.interval == minInterval),
      max: producers.filter(e => e.interval == maxInterval)
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve movies by interval' });
  }
};
