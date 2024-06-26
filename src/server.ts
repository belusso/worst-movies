import app from './app';
import { rxDB } from './db';

const PORT = process.env.PORT || 3000;

(async () => {
  await rxDB()
  app.listen(PORT, () => {
    console.log('Server listening on port 3000');
  })
})();
