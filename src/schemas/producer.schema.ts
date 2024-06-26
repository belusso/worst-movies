
interface Producer {
  producer: string;
  previousWin: number;
  followingWin: number;
  interval: number
}

const producerSchema = {
  title: 'Producer schema',
  primaryKey: {
    key: "id",
    fields: ['producer', 'previousWin', 'followingWin'],
    separator: '|'
  },
  version: 0,
  type: 'object',
  properties: {
    id: { type: 'string', "maxLength": 200 },
    producer: { type: 'string' },
    previousWin: { type: 'number', minimum: 0, maximum: 100000, multipleOf: 1 },
    followingWin: { type: 'number', minimum: 0, maximum: 100000, multipleOf: 1 },
    interval: { type: 'number', minimum: 0, maximum: 100000, multipleOf: 1 },
  },
  required: ['producer', 'previousWin', 'followingWin', 'interval'],
};

export { Producer, producerSchema };