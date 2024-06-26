
import request from 'supertest';
import app from '../app';
import { rxDB } from '../db';
import { before } from 'node:test';

describe('Movies API', () => {

  before(async function () {
    // create database in memory and load csv file
    await rxDB()
  });

  it('should get all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(206);
  });

  it('should get a movie by Title', async () => {
    const res = await request(app).get('/movies/Cats');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('studios', 'Universal Pictures');
  });

  it('should return an error, movie does not exists', async () => {
    const res = await request(app).get('/movies/Cats999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Movie not found');
  });

  it('should return 404 if route not found', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(404);
  });

  it('should return producer with the longest interval between two consecutive awards, and the one who obtained two awards faster', async () => {
    const res = await request(app).get('/producers');
    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');

    // checking length of min and max
    expect(res.body.min).toHaveLength(1);
    expect(res.body.max).toHaveLength(1);

    // checking min producer 
    expect(res.body.min.at(0)).toHaveProperty('producer', 'Joel Silver');
    expect(res.body.min.at(0)).toHaveProperty('previousWin', 1990);
    expect(res.body.min.at(0)).toHaveProperty('followingWin', 1991);
    expect(res.body.min.at(0)).toHaveProperty('interval', 1);

    // cheking max producers
    expect(res.body.max.at(0)).toHaveProperty('producer', 'Matthew Vaughn');
    expect(res.body.max.at(0)).toHaveProperty('previousWin', 2002);
    expect(res.body.max.at(0)).toHaveProperty('followingWin', 2015);
    expect(res.body.max.at(0)).toHaveProperty('interval', 13);
  });

});
