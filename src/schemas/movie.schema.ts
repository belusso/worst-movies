interface Movie {
  title: string;
  year: number;
  studios: string;
  producers: string;
  winner: boolean
}

const movieSchema = {
  title: 'Movie schema',
  primaryKey: "title",
  version: 0,
  type: 'object',
  properties: {
    title: { type: 'string', "maxLength": 200 },
    year: { type: 'number', minimum: 0, maximum: 100000, multipleOf: 1 },
    studios: { type: 'string' },
    producers: { type: 'string' },
    winner: { type: 'boolean' },
  },
  required: ['name', 'year', 'studios', 'producers', 'winner'],
};

export { Movie, movieSchema };