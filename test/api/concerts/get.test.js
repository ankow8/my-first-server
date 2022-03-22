const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({_id: '5d9f1140f10a81216cfd4408', performer: 'Adam', genre: 'Hip-Hop', price: 35, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
    await testConOne.save();
    const testConTwo = new Concert({_id: '5d9f1159f81ce8d1ef2bee48', performer: 'Samantha', genre: 'Alternative', price: 30, day: 2, image: '/img/uploads/hdfh42sd213.jpg'});
    await testConTwo.save();
    const testConThree = new Concert({_id: '62379d5b8cc7ffd04d91724f', performer: 'Danzel', genre: 'Disco', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg'});
    await testConThree.save();
  });
  after(async () => {
    await Concert.deleteMany();
  });
  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });
  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
  it('/performer/:performer should return one concert by :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/Samantha');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('/genre/:genre should return one concert by :genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Hip-Hop'); // w testach nie jest ujęta poprawna pisownia endpointów
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('/price/:price_min/:price_max should return two concerts by :day ', async () => {
    const res = await request(server).get('/api/concerts/price/25/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('/price/day/:day should return two concerts by :day ', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
});
