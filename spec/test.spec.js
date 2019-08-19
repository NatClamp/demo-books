const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../server')

const request = supertest(app)
const connection = require('../db/connection')

describe('/*', () => {
    beforeEach(() => connection.migrate
        .rollback()
        .then(() => connection.migrate.latest())
        .then(() => connection.seed.run()));
    after(() => connection.destroy());
});